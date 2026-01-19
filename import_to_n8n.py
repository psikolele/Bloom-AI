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

# WORKFLOW ID TO UPDATE
WORKFLOW_ID = "uYNin7KcptmBF8Nw"
URL_WITH_ID = f"{N8N_URL}/{WORKFLOW_ID}"

print(f"Updating workflow {WORKFLOW_ID} at {URL_WITH_ID}...")

try:
    # We use PUT to update
    response = requests.put(URL_WITH_ID, json=payload, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        print(f"SUCCESS! Workflow updated.")
        print(f"Name: {data['name']}")
        print("Workflow remains ACTIVE.")
             
    else:
        print(f"FAILED (Status {response.status_code})")
        print(response.text)

except Exception as e:
    print(f"Error: {e}")
