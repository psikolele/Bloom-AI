
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# N8N Configuration
N8N_WORKFLOW_ID = "T1faX7EmrumACUVb"
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

def diagnose_workflow():
    print("=" * 60)
    print("N8N WORKFLOW DIAGNOSTIC REPORT")
    print("=" * 60)
    
    workflow = get_workflow()
    
    # Basic Info
    print(f"\n[1] WORKFLOW INFO")
    print(f"    ID: {workflow.get('id')}")
    print(f"    Name: {workflow.get('name')}")
    print(f"    Active: {workflow.get('active')}")
    
    # Webhook Node Analysis
    print(f"\n[2] WEBHOOK NODE ANALYSIS")
    nodes = workflow.get('nodes', [])
    webhook_found = False
    
    for node in nodes:
        if 'webhook' in node.get('type', '').lower():
            webhook_found = True
            print(f"    Node Name: {node.get('name')}")
            print(f"    Type: {node.get('type')}")
            print(f"    Type Version: {node.get('typeVersion')}")
            
            params = node.get('parameters', {})
            print(f"    HTTP Method: {params.get('httpMethod', 'GET')}")
            print(f"    Path: {params.get('path', 'NOT SET')}")
            
            options = params.get('options', {})
            print(f"    Options: {json.dumps(options, indent=6)}")
            
            # Check CORS specifically
            allowed_origins = options.get('allowedOrigins', 'NOT SET')
            print(f"    Allowed Origins (CORS): {allowed_origins}")
            
            # Response mode
            response_mode = params.get('responseMode', 'NOT SET')
            print(f"    Response Mode: {response_mode}")
    
    if not webhook_found:
        print("    WARNING: No webhook node found!")
    
    # Connection Analysis
    print(f"\n[3] CONNECTIONS")
    connections = workflow.get('connections', {})
    for source, targets in connections.items():
        if 'webhook' in source.lower():
            print(f"    {source} -> {targets}")
    
    # Settings
    print(f"\n[4] SETTINGS")
    settings = workflow.get('settings', {})
    print(f"    {json.dumps(settings, indent=4)}")
    
    # Critical Issues
    print(f"\n[5] CRITICAL ISSUES DETECTED")
    issues = []
    
    if not workflow.get('active'):
        issues.append("❌ Workflow is NOT ACTIVE - webhooks won't respond!")
    
    for node in nodes:
        if 'webhook' in node.get('type', '').lower():
            options = node.get('parameters', {}).get('options', {})
            if 'allowedOrigins' not in options:
                issues.append("❌ CORS not configured - allowedOrigins missing from webhook options")
    
    if not issues:
        print("    ✅ No critical issues detected")
    else:
        for issue in issues:
            print(f"    {issue}")
    
    print("\n" + "=" * 60)
    return workflow

if __name__ == "__main__":
    diagnose_workflow()
