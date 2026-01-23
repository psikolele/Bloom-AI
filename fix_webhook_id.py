
import json
import requests
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

N8N_WORKFLOW_ID = "T1faX7EmrumACUVb"
N8N_URL = f"https://emanueleserra.app.n8n.cloud/api/v1/workflows/{N8N_WORKFLOW_ID}"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

headers = {"X-N8N-API-KEY": API_KEY, "Content-Type": "application/json"}

def get_workflow():
    response = requests.get(N8N_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching workflow: {response.status_code}")
        print(response.text)
        exit(1)

def fix_webhook_node():
    print("Fetching current workflow...")
    workflow = get_workflow()
    
    nodes = workflow.get('nodes', [])
    updated = False
    new_webhook_id = None
    
    for node in nodes:
        if node.get('type') == 'n8n-nodes-base.webhook':
            old_id = node.get('id')
            print(f"Current webhook node ID: {old_id}")
            
            # Generate a proper UUID
            new_webhook_id = str(uuid.uuid4())
            node['id'] = new_webhook_id
            print(f"New webhook node ID: {new_webhook_id}")
            
            # Also add webhookId to parameters if needed
            # N8N sometimes uses webhookId separately
            if 'webhookId' not in node:
                node['webhookId'] = new_webhook_id
                print(f"Added webhookId: {new_webhook_id}")
            
            updated = True
    
    if not updated:
        print("No webhook node found!")
        return
    
    # Prepare update payload
    payload = {
        "name": workflow.get('name'),
        "nodes": nodes,
        "connections": workflow.get('connections'),
        "settings": workflow.get('settings')
    }
    
    print("\nUpdating workflow...")
    response = requests.put(N8N_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        print("SUCCESS! Workflow updated.")
        print(f"\nNew Webhook URLs:")
        print(f"  Production: https://emanueleserra.app.n8n.cloud/webhook/{new_webhook_id}")
        print(f"  Test: https://emanueleserra.app.n8n.cloud/webhook-test/{new_webhook_id}")
        print(f"\n  OR (path-based if supported):")
        print(f"  Production: https://emanueleserra.app.n8n.cloud/webhook/caption-flow")
    else:
        print(f"Error updating workflow: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    fix_webhook_node()
