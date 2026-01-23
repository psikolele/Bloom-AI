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

# Workflow ID from the error log
workflow_id = "8pK8KTEKjXeQ1tZd"

print("=" * 70)
print("DETAILED NOTION NODE INSPECTION")
print("=" * 70)

workflow = get_workflow(workflow_id)
if not workflow:
    exit(1)

print(f"\n✅ Workflow: {workflow.get('name')}")
print(f"   ID: {workflow.get('id')}")

# Find all Notion nodes
nodes = workflow.get('nodes', [])
notion_nodes = [n for n in nodes if 'notion' in n.get('type', '').lower()]

print(f"\n📝 Found {len(notion_nodes)} Notion node(s)")

for idx, node in enumerate(notion_nodes):
    print(f"\n{'=' * 70}")
    print(f"NOTION NODE #{idx + 1}: {node.get('name')}")
    print(f"{'=' * 70}")
    print(f"Type: {node.get('type')}")
    print(f"Type Version: {node.get('typeVersion')}")
    
    params = node.get('parameters', {})
    
    print(f"\n📋 All Parameters:")
    print(json.dumps(params, indent=2))
    
    # Check what resource and operation it's using
    resource = params.get('resource')
    operation = params.get('operation')
    print(f"\n🎯 Resource: {resource}")
    print(f"   Operation: {operation}")
    
    # Check database configuration
    database_id = params.get('databaseId')
    print(f"\n🗄️ Database ID: {database_id}")
    
    # Check if using "Simple" mode
    simple_mode = params.get('simple', True)
    print(f"\n⚙️ Simple Mode: {simple_mode}")
    
    # Check properties or propertiesUi
    properties = params.get('properties', {})
    properties_ui = params.get('propertiesUi', {})
    
    print(f"\n🏗️ Properties (legacy): {json.dumps(properties, indent=2)}")
    print(f"\n🏗️ PropertiesUI: {json.dumps(properties_ui, indent=2)}")
    
    # Save full node to file
    filename = f"notion_node_{idx + 1}.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(node, f, indent=2)
    print(f"\n💾 Full node saved to: {filename}")

print(f"\n{'=' * 70}")
