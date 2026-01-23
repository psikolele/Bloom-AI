import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

N8N_BASE_URL = "https://emanueleserra.app.n8n.cloud"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

headers = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def get_workflow(workflow_id):
    url = f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

def update_workflow(workflow_id, workflow):
    url = f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}"
    
    payload = {
        "name": workflow.get('name'),
        "nodes": workflow.get('nodes'),
        "connections": workflow.get('connections'),
        "settings": workflow.get('settings'),
        "staticData": workflow.get('staticData')
    }
    
    response = requests.put(url, json=payload, headers=headers)
    
    if response.status_code == 200:
        print("\n✅ SUCCESS! Workflow updated.")
        return True
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)
        return False

# Workflow ID
workflow_id = "8pK8KTEKjXeQ1tZd"

print("=" * 70)
print("FIX MARKETING FLOW NOTION NODE")
print("=" * 70)

workflow = get_workflow(workflow_id)
if not workflow:
    exit(1)

print(f"\n✅ Workflow: {workflow.get('name')}")

# Find and fix Notion node
nodes = workflow.get('nodes', [])
fixed = False

for node in nodes:
    if node.get('type') == 'n8n-nodes-base.notion' and node.get('name') == 'Create a database page':
        print(f"\n🔧 Fixing Notion node: {node.get('name')}")
        
        params = node.get('parameters', {})
        prop_ui = params.get('propertiesUi', {})
        prop_values = prop_ui.get('propertyValues', [])
        
        print(f"\n📋 Current property count: {len(prop_values)}")
        
        # Fix each property to handle undefined values
        for prop in prop_values:
            key = prop.get('key', '')
            
            if key == 'Website|url':
                # Add fallback for undefined website
                old_value = prop.get('urlValue', '')
                new_value = "={{ $json.website || '' }}"
                prop['urlValue'] = new_value
                print(f"   ✓ Fixed Website: {old_value} → {new_value}")
                
            elif key == 'Industry|select':
                # Add fallback for undefined industry
                old_value = prop.get('selectValue', '')
                new_value = "={{ $json.industry || 'Other' }}"
                prop['selectValue'] = new_value
                print(f"   ✓ Fixed Industry: {old_value} → {new_value}")
                
            elif 'rich_text' in key:
                # Add fallback for all text fields
                old_value = prop.get('textContent', '')
                field_name = key.split('|')[0].lower().replace(' ', '_')
                new_value = f"={{{{ $json.{field_name} || '' }}}}"
                
                # Handle special cases
                if 'Instagram Handle' in key:
                    prop['textContent'] = "={{ $json.instagram_handle ? '@' + $json.instagram_handle : '' }}"
                elif 'Keywords' in key:
                    # Already has array handling
                    pass
                else:
                    if '$json' in old_value and '||' not in old_value:
                        # Only update if it doesn't already have fallback
                        prop['textContent'] = new_value.replace(field_name, old_value.split('$json.')[1].split('}')[0])
                        
            elif key.endswith('|url') and 'Competitor' in key:
                # Fix competitor URLs
                old_value = prop.get('urlValue', '')
                if '||' not in old_value:
                    field_name = old_value.split('$json.')[1].split('}')[0] if '$json.' in old_value else ''
                    if field_name:
                        prop['urlValue'] = f"={{{{ $json.{field_name} || '' }}}}"
                        
            elif key.endswith('|url') and key.startswith('Instagram|'):
                # Fix Instagram URL
                old_value = prop.get('urlValue', '')
                new_value = "={{ $json.social_links?.instagram || '' }}"
                prop['urlValue'] = new_value
                print(f"   ✓ Fixed Instagram URL: uses optional chaining")
        
        # Update the node
        params['propertiesUi']['propertyValues'] = prop_values
        node['parameters'] = params
        fixed = True
        
        print(f"\n✅ Fixed all properties with fallback values")
        
        # Save fixed node to file for inspection
        with open('notion_node_fixed.json', 'w') as f:
            json.dump(node, f, indent=2)
        print(f"💾 Saved fixed node to: notion_node_fixed.json")

if fixed:
    print("\n📤 Updating workflow...")
    update_workflow(workflow_id, workflow)
else:
    print("\n❌ Notion node not found")

print("\n" + "=" * 70)
print("SUMMARY:")
print("The fix adds fallback values (|| '') to prevent 'undefined' errors.")
print("This ensures empty strings are sent instead of undefined values.")
print("=" * 70)
