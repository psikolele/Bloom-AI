import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# N8N Configuration
N8N_BASE_URL = "https://emanueleserra.app.n8n.cloud"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

headers = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def search_workflows(query):
    """Search for workflows by name"""
    url = f"{N8N_BASE_URL}/api/v1/workflows"
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error fetching workflows: {response.status_code}")
        print(response.text)
        return []
    
    workflows = response.json().get('data', [])
    matching = [w for w in workflows if query.lower() in w.get('name', '').lower()]
    return matching

def get_workflow(workflow_id):
    """Get workflow details by ID"""
    url = f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}"
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching workflow: {response.status_code}")
        print(response.text)
        return None

def fix_notion_node(workflow):
    """Fix the Notion node property mappings"""
    nodes = workflow.get('nodes', [])
    fixed = False
    
    for node in nodes:
        # Look for Notion nodes
        if 'notion' in node.get('type', '').lower():
            print(f"\n📝 Found Notion node: {node.get('name')}")
            print(f"   Type: {node.get('type')}")
            
            # Get current parameters
            params = node.get('parameters', {})
            properties = params.get('properties', {})
            
            print(f"\n🔍 Current properties configuration:")
            print(json.dumps(properties, indent=2))
            
            # Fix Website property - it should be URL type
            if 'Website' in properties:
                print(f"\n🔧 Fixing 'Website' property...")
                # The Website property should have a 'url' key with the value
                # Based on the error, we need to provide the correct structure
                properties['Website'] = {
                    'url': properties.get('Website', '')
                }
            
            # Fix Industry property - it should be select or relation type
            if 'Industry' in properties:
                print(f"🔧 Fixing 'Industry' property...")
                # For select properties, we need to provide a 'name' key
                properties['Industry'] = {
                    'name': properties.get('Industry', '')
                }
            
            # Update the node parameters
            node['parameters']['properties'] = properties
            fixed = True
            
            print(f"\n✅ Fixed properties:")
            print(json.dumps(properties, indent=2))
    
    return fixed

def update_workflow(workflow_id, workflow):
    """Update workflow via API"""
    url = f"{N8N_BASE_URL}/api/v1/workflows/{workflow_id}"
    
    # Prepare clean payload (remove read-only fields)
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
        print(f"\n❌ Error updating workflow: {response.status_code}")
        print(response.text)
        return False

def main():
    print("=" * 60)
    print("NOTION PROPERTIES FIX TOOL")
    print("=" * 60)
    
    # Search for the workflow
    print("\n🔍 Searching for 'Marketing Flow with Webpage'...")
    workflows = search_workflows("Marketing Flow with Webpage")
    
    if not workflows:
        print("❌ Workflow not found. Available workflows:")
        all_workflows = search_workflows("")
        for w in all_workflows:
            print(f"   - {w.get('name')} (ID: {w.get('id')})")
        return
    
    print(f"✅ Found {len(workflows)} matching workflow(s):")
    for w in workflows:
        print(f"   - {w.get('name')} (ID: {w.get('id')})")
    
    # Use the first matching workflow
    workflow_id = workflows[0].get('id')
    print(f"\n📥 Fetching workflow details for ID: {workflow_id}")
    
    workflow = get_workflow(workflow_id)
    if not workflow:
        return
    
    print(f"✅ Loaded workflow: {workflow.get('name')}")
    
    # Fix the Notion node
    print("\n🔧 Fixing Notion node properties...")
    if fix_notion_node(workflow):
        # Update the workflow
        print("\n📤 Updating workflow on N8N...")
        update_workflow(workflow_id, workflow)
    else:
        print("❌ No Notion node found to fix")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
