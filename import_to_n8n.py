import json
import requests
import sys

# Configuration
N8N_URL = "https://emanueleserra.app.n8n.cloud/api/v1/workflows"
API_KEY = "" # Will be populated or passed as arg

if len(sys.argv) > 1:
    API_KEY = sys.argv[1]

if not API_KEY:
    print("Error: API Key is missing. Usage: python import_to_n8n.py <YOUR_API_KEY>")
    sys.exit(1)

# Load Workflow
try:
    with open('unified_workflow.json', 'r', encoding='utf-8') as f:
        workflow_data = json.load(f)
except FileNotFoundError:
    print("Error: unified_workflow.json not found.")
    sys.exit(1)

# Prepare Payload
# The API expects { "name": "...", "nodes": [...], "connections": {...}, "settings": {...} }
# Our JSON file is already in this format mostly.
payload = {
    "name": "Bloom AI Unified Auth (Imported)",
    "nodes": workflow_data['nodes'],
    "connections": workflow_data['connections'],
    "settings": workflow_data.get('settings', {})
}

headers = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

print(f"Uploading workflow to {N8N_URL}...")

try:
    response = requests.post(N8N_URL, json=payload, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        workflow_id = data['id']
        print(f"SUCCESS! Workflow created with ID: {workflow_id}")
        
        # ACTIVATE WORKFLOW
        print("Activating workflow...")
        activate_url = f"{N8N_URL}/{workflow_id}/activate"
        activate_response = requests.post(activate_url, headers=headers)
        
        if activate_response.status_code == 200:
             print("Workflow is now ACTIVE.")
        else:
             print(f"Warning: Could not activate workflow automatically (Status {activate_response.status_code}). Please activate manually in N8N.")
             
    else:
        print(f"FAILED (Status {response.status_code})")
        print(response.text)

except Exception as e:
    print(f"Error: {e}")
