
import requests
import os
import time
from dotenv import load_dotenv

load_dotenv()

N8N_WORKFLOW_ID = "T1faX7EmrumACUVb"
N8N_BASE = "https://emanueleserra.app.n8n.cloud/api/v1"
API_KEY = os.getenv("N8N_API_KEY")

if not API_KEY:
    print("Error: N8N_API_KEY not found in .env")
    exit(1)

headers = {"X-N8N-API-KEY": API_KEY, "Content-Type": "application/json"}

def toggle_workflow():
    print("Step 1: Deactivating workflow...")
    response = requests.patch(
        f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}/deactivate",
        headers=headers
    )
    if response.status_code == 200:
        print("  Workflow deactivated successfully.")
    else:
        print(f"  Error: {response.status_code} - {response.text}")
        # Try alternative method
        print("  Trying alternative deactivation via PUT...")
        workflow = requests.get(f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}", headers=headers).json()
        workflow_payload = {
            "name": workflow.get('name'),
            "nodes": workflow.get('nodes'),
            "connections": workflow.get('connections'),
            "settings": workflow.get('settings'),
            "active": False
        }
        alt_response = requests.put(f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}", json=workflow_payload, headers=headers)
        if alt_response.status_code == 200:
            print("  Workflow deactivated via PUT.")
        else:
            print(f"  Alternative also failed: {alt_response.status_code}")
    
    print("\nWaiting 3 seconds...")
    time.sleep(3)
    
    print("\nStep 2: Reactivating workflow...")
    response = requests.patch(
        f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}/activate",
        headers=headers
    )
    if response.status_code == 200:
        result = response.json()
        print("  Workflow activated successfully!")
        print(f"  Active: {result.get('active')}")
    else:
        print(f"  Error: {response.status_code} - {response.text}")
        # Try alternative method
        print("  Trying alternative activation via PUT...")
        workflow = requests.get(f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}", headers=headers).json()
        workflow_payload = {
            "name": workflow.get('name'),
            "nodes": workflow.get('nodes'),
            "connections": workflow.get('connections'),
            "settings": workflow.get('settings'),
            "active": True
        }
        alt_response = requests.put(f"{N8N_BASE}/workflows/{N8N_WORKFLOW_ID}", json=workflow_payload, headers=headers)
        if alt_response.status_code == 200:
            print("  Workflow activated via PUT.")
        else:
            print(f"  Alternative also failed: {alt_response.status_code}")
    
    print("\nStep 3: Testing webhook...")
    time.sleep(2)
    
    # Test the webhook
    test_urls = [
        "https://emanueleserra.app.n8n.cloud/webhook/caption-flow",
        "https://emanueleserra.app.n8n.cloud/webhook/fc2a190c-ad8d-470a-b4de-cd7bb010beec"
    ]
    
    for url in test_urls:
        try:
            test_response = requests.post(
                url,
                json={"Topic": "Test", "Platform": "Instagram", "Audience": "Test", "Voice": "Professional"},
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            print(f"\n  URL: {url}")
            print(f"  Status: {test_response.status_code}")
            print(f"  Response: {test_response.text[:200] if test_response.text else 'No content'}")
        except Exception as e:
            print(f"\n  URL: {url}")
            print(f"  Error: {e}")

if __name__ == "__main__":
    toggle_workflow()
