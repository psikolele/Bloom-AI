import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

N8N_WORKFLOW_ID = "2WKzb93sJnfLO1Bv"
N8N_URL = f"https://emanueleserra.app.n8n.cloud/api/v1/workflows/{N8N_WORKFLOW_ID}"
API_KEY = os.getenv("N8N_API_KEY")

headers = {"X-N8N-API-KEY": API_KEY}
response = requests.get(N8N_URL, headers=headers)

if response.status_code == 200:
    workflow = response.json()
    
    print("=" * 80)
    print("WORKFLOW CONFIGURATION ANALYSIS")
    print("=" * 80)
    print(f"\nWorkflow Name: {workflow['name']}")
    print(f"Active: {workflow.get('active', False)}")
    print(f"\nNodes ({len(workflow['nodes'])}):")
    
    for node in workflow['nodes']:
        print(f"\n  • {node['name']} ({node['type']})")
        if node['type'] == 'n8n-nodes-base.webhook':
            params = node.get('parameters', {})
            print(f"    - Path: {params.get('path', 'N/A')}")
            print(f"    - Method: {params.get('httpMethod', 'N/A')}")
            print(f"    - Response Mode: {params.get('responseMode', 'N/A')}")
        elif node['type'] == 'n8n-nodes-base.set':
            assignments = node.get('parameters', {}).get('assignments', {}).get('assignments', [])
            print(f"    - Fields: {len(assignments)}")
            for field in assignments:
                print(f"      * {field.get('name')}: {field.get('value')} ({field.get('type')})")
        elif node['type'] == 'n8n-nodes-base.notion':
            params = node.get('parameters', {})
            print(f"    - Resource: {params.get('resource', 'N/A')}")
            print(f"    - Operation: {params.get('operation', 'N/A')}")
    
    print("\n\nConnections:")
    for source, targets in workflow['connections'].items():
        print(f"\n  {source} →")
        if 'main' in targets:
            for connections in targets['main']:
                for conn in connections:
                    print(f"    → {conn['node']}")
    
    # Save full workflow for inspection
    with open("current_workflow_config.json", "w", encoding="utf-8") as f:
        json.dump(workflow, f, indent=2)
    
    print("\n\n✅ Full workflow saved to current_workflow_config.json")
    print("=" * 80)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
