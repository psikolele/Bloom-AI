
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# N8N Configuration
N8N_WORKFLOW_ID = "2WKzb93sJnfLO1Bv"
N8N_URL = f"https://emanueleserra.app.n8n.cloud/api/v1/workflows/{N8N_WORKFLOW_ID}"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

def get_workflow():
    headers = {"X-N8N-API-KEY": API_KEY}
    response = requests.get(N8N_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching workflow: {response.status_code}")
        print(response.text)
        exit(1)

def update_workflow(workflow_data):
    headers = {
        "X-N8N-API-KEY": API_KEY,
        "Content-Type": "application/json"
    }
    
    # Remove read-only fields and clean settings
    settings = workflow_data.get("settings", {})
    # Keep only the allowed settings fields
    clean_settings = {
        "callerPolicy": settings.get("callerPolicy", "workflowsFromSameOwner"),
        "executionOrder": settings.get("executionOrder", "v0")
    }
    
    clean_data = {
        "name": workflow_data["name"],
        "nodes": workflow_data["nodes"],
        "connections": workflow_data["connections"],
        "settings": clean_settings,
        "staticData": workflow_data.get("staticData")
    }
    
    response = requests.put(N8N_URL, headers=headers, json=clean_data)
    if response.status_code == 200:
        print("✅ Workflow updated successfully!")
        return response.json()
    else:
        print(f"❌ Error updating workflow: {response.status_code}")
        print(response.text)
        exit(1)

print("=" * 80)
print("FIXING BLOOM AI REGISTRATION WORKFLOW RESPONSE")
print("=" * 80)

workflow = get_workflow()

# Find and update the "Respond to Webhook" node
for node in workflow["nodes"]:
    if node["name"] == "Respond to Webhook":
        print(f"\n[1] Found 'Respond to Webhook' node")
        print(f"    Current config:")
        print(f"       respondWith: {node['parameters'].get('respondWith')}")
        print(f"       responseBody: {node['parameters'].get('responseBody')}")
        
        # Update to return clean JSON
        node["parameters"]["respondWith"] = "json"
        node["parameters"]["responseBody"] = json.dumps({
            "success": True,
            "message": "User registered successfully"
        })
        
        # Ensure options are empty
        node["parameters"]["options"] = {}
        
        print(f"\n[2] Updated configuration:")
        print(f"       respondWith: {node['parameters']['respondWith']}")
        print(f"       responseBody: {node['parameters']['responseBody']}")

# Save updated workflow
print(f"\n[3] Saving updated workflow...")
updated_workflow = update_workflow(workflow)

# Save for verification
with open("registration_workflow_updated.json", "w", encoding="utf-8") as f:
    json.dump(updated_workflow, f, indent=2)

print(f"\n[4] Updated workflow saved to 'registration_workflow_updated.json'")
print("\n" + "=" * 80)
print("✅ FIX COMPLETE - Test registration again!")
print("=" * 80)
