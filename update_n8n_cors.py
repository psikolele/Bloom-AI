
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# N8N Configuration
N8N_WORKFLOW_ID = "T1faX7EmrumACUVb"
# Base URL for workflows endpoint
N8N_URL = f"https://emanueleserra.app.n8n.cloud/api/v1/workflows/{N8N_WORKFLOW_ID}"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

def get_workflow():
    headers = {
        "X-N8N-API-KEY": API_KEY
    }
    response = requests.get(N8N_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching workflow: {response.status_code}")
        print(response.text)
        exit(1)

def enable_cors(workflow_data):
    nodes = workflow_data.get('nodes', [])
    updated = False
    
    for node in nodes:
        if node.get('type') == 'n8n-nodes-base.webhook':
            # Check if it's the right webhook
            if node.get('name') == "CaptionFlow Webhook" or 'caption-flow' in str(node.get('parameters', {}).get('path', '')):
                print(f"Found Webhook Node: {node['name']}")
                
                # Ensure parameters object exists
                if 'parameters' not in node:
                    node['parameters'] = {}
                
                # Ensure options object exists
                if 'options' not in node['parameters']:
                    node['parameters']['options'] = {}
                
                # Set Allowed Origins to *
                # Note: In N8N JSON, the parameter name for CORS is typically "allowedOrigins"
                node['parameters']['options']['allowedOrigins'] = '*'
                
                updated = True
                print("CORS enabled on Webhook Node.")
    
    if not updated:
        print("Warning: Webhook node not found or not updated.")
    
    return workflow_data

def update_workflow():
    workflow_data = get_workflow()
    updated_data = enable_cors(workflow_data)
    
    # Payload for PUT: name, nodes, connections, settings, pinData (optional)
    # We should strip ID from the payload body for PUT? Usually PUT to /ID requires ID in URL, body can/should match.
    # But N8N API often wants just the core fields.
    
    payload = {
        "name": updated_data.get('name'),
        "nodes": updated_data.get('nodes'),
        "connections": updated_data.get('connections'),
        "settings": updated_data.get('settings')
    }
    
    headers = {
        "X-N8N-API-KEY": API_KEY,
        "Content-Type": "application/json"
    }
    
    response = requests.put(N8N_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        res_json = response.json()
        print("SUCCESS")
        print(f"Workflow Updated: {res_json['id']}")
    else:
        print(f"Error updating workflow: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    update_workflow()
