
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

N8N_WORKFLOW_ID = "T1faX7EmrumACUVb"
N8N_BASE = "https://emanueleserra.app.n8n.cloud/api/v1"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

headers = {"X-N8N-API-KEY": API_KEY}

# Get workflow details
print("Fetching workflow...")
response = requests.get(f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}", headers=headers)
workflow = response.json()

print(f"Workflow: {workflow.get('name')}")
print(f"Active: {workflow.get('active')}")

# Find webhook node
for node in workflow.get('nodes', []):
    if 'webhook' in node.get('type', '').lower():
        print(f"\nWebhook Node: {node.get('name')}")
        print(f"  Full Node Data:")
        print(json.dumps(node, indent=2))
        
        # Check webhookId if present
        webhook_id = node.get('webhookId')
        if webhook_id:
            print(f"\n  Webhook ID: {webhook_id}")
            print(f"  Production URL: https://emanueleserra.app.n8n.cloud/webhook/{webhook_id}")
            print(f"  Test URL: https://emanueleserra.app.n8n.cloud/webhook-test/{webhook_id}")
        
        # Path from parameters
        path = node.get('parameters', {}).get('path', '')
        print(f"\n  Configured Path: {path}")
        print(f"  Expected Production: https://emanueleserra.app.n8n.cloud/webhook/{path}")

# Also try to list all webhooks if API supports it
print("\n\nTrying to list executions to verify workflow is reachable...")
exec_response = requests.get(f"{N8N_BASE}/executions?workflowId={N8N_WORKFLOW_ID}&limit=5", headers=headers)
if exec_response.status_code == 200:
    executions = exec_response.json().get('data', [])
    print(f"Recent executions: {len(executions)}")
    for ex in executions[:3]:
        print(f"  - {ex.get('id')}: {ex.get('status')} at {ex.get('startedAt')}")
else:
    print(f"Could not fetch executions: {exec_response.status_code}")
