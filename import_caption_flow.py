
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

N8N_URL = "https://emanueleserra.app.n8n.cloud/api/v1/workflows"
API_KEY = os.getenv("N8N_API_KEY")
WORKFLOW_FILE = "caption_flow_workflow.json"

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

def load_workflow():
    with open(WORKFLOW_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def modify_workflow(data):
    nodes = data['nodes']
    connections = data['connections']
    
    # 1. Start with a clean slate of connections we want to keep
    # We will remove connections from the nodes we are deleting
    
    # 2. Identify Nodes to Remove
    nodes_to_remove = [
        "Scheduled Start: Check for New Posts", 
        "1. Get Next Post Idea from Sheet",
        "Sticky Note7" # The note about scheduled start
    ]
    
    filtered_nodes = [n for n in nodes if n['name'] not in nodes_to_remove]
    
    # 3. Add Webhook Node
    webhook_node = {
        "parameters": {
            "httpMethod": "POST",
            "path": "caption-flow",
            "options": {}
        },
        "name": "CaptionFlow Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
            -1200, 
            -380
        ],
        "id": "webhook-trigger-node-id"
    }
    filtered_nodes.append(webhook_node)
    
    # 4. Rebuild Connections
    # We need to connect Webhook -> "2. Prepare Input Variables..."
    # The target node name is "2. Prepare Input Variables (Topic, Audience, etc.)"
    # Its ID in the JSON is "42e129d0-5e4f-4226-a86f-b7fd04c8c497" but usage via Name is safer in 'connections' dict usually, 
    # though N8N uses names in the connection keys.
    
    new_connections = {}
    
    # Copy over connections that don't involve removed nodes
    for source_node, targets in connections.items():
        if source_node not in nodes_to_remove:
            new_connections[source_node] = targets
            
    # Add Webhook connection
    new_connections["CaptionFlow Webhook"] = {
        "main": [
            [
                {
                    "node": "2. Prepare Input Variables (Topic, Audience, etc.)",
                    "type": "main",
                    "index": 0
                }
            ]
        ]
    }
    
    # Create a clean payload with only allowed keys
    payload = {
        "name": "Caption Flow Backend",
        "nodes": filtered_nodes,
        "connections": new_connections,
        "settings": data.get('settings', {"executionOrder": "v1"})
    }
    
    return payload

def import_workflow():
    data = load_workflow()
    data = modify_workflow(data)
    
    headers = {
        "X-N8N-API-KEY": API_KEY,
        "Content-Type": "application/json"
    }
    
    # Remove ID to force creation of new workflow, or keep it if we want to overwrite?
    # The JSON has an ID "0.xxxxx". N8N might reject if it doesn't match a real ID or if we try to POST with an ID.
    # Safest is to remove 'id' from the root if it exists (it's not usually in export root, but 'meta' has instanceId)
    if 'id' in data:
        del data['id']
        
    response = requests.post(N8N_URL, json=data, headers=headers)
    
    if response.status_code == 200:
        res_json = response.json()
        print("SUCCESS")
        print(f"Workflow ID: {res_json['id']}")
        print(f"Name: {res_json['name']}")
    else:
        print(f"Error importing workflow: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    import_workflow()
