
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# N8N Configuration - Bloom AI Registration workflow
N8N_WORKFLOW_ID = "2WKzb93sJnfLO1Bv"  # ID del workflow di registrazione
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

def analyze_registration_workflow():
    print("=" * 80)
    print("BLOOM AI REGISTRATION WORKFLOW ANALYSIS")
    print("=" * 80)
    
    workflow = get_workflow()
    
    # Salva il workflow completo per debug
    with open("registration_workflow.json", "w", encoding="utf-8") as f:
        json.dump(workflow, f, indent=2)
    print("\n✅ Workflow salvato in 'registration_workflow.json'\n")
    
    # Basic Info
    print(f"[1] WORKFLOW INFO")
    print(f"    ID: {workflow.get('id')}")
    print(f"    Name: {workflow.get('name')}")
    print(f"    Active: {workflow.get('active')}")
    
    # Analizza tutti i nodi
    print(f"\n[2] NODES ANALYSIS")
    nodes = workflow.get('nodes', [])
    
    for i, node in enumerate(nodes, 1):
        print(f"\n    Node {i}: {node.get('name')}")
        print(f"    Type: {node.get('type')}")
        
        # Dettagli specifici per tipo di nodo
        if 'webhook' in node.get('type', '').lower():
            print(f"    🔔 WEBHOOK NODE")
            params = node.get('parameters', {})
            print(f"       - HTTP Method: {params.get('httpMethod', 'GET')}")
            print(f"       - Path: {params.get('path', 'NOT SET')}")
            print(f"       - Response Mode: {params.get('responseMode', 'NOT SET')}")
            options = params.get('options', {})
            print(f"       - CORS: {options.get('allowedOrigins', 'NOT SET')}")
        
        elif 'notion' in node.get('type', '').lower():
            print(f"    📝 NOTION NODE")
            params = node.get('parameters', {})
            print(f"       - Operation: {params.get('operation', 'NOT SET')}")
            print(f"       - Database ID: {params.get('databaseId', 'NOT SET')}")
            
            # Analizza le properties mappate
            properties = params.get('properties', {})
            if properties:
                print(f"       - Properties mapped:")
                for prop_name, prop_value in properties.items():
                    print(f"         • {prop_name}: {prop_value}")
        
        elif 'respond' in node.get('name', '').lower() or 'response' in node.get('type', '').lower():
            print(f"    📤 RESPONSE NODE")
            params = node.get('parameters', {})
            print(f"       - Parameters: {json.dumps(params, indent=10)}")
    
    # Analizza connections
    print(f"\n[3] WORKFLOW FLOW (CONNECTIONS)")
    connections = workflow.get('connections', {})
    for source, targets in connections.items():
        print(f"    {source} →")
        for output_type, output_list in targets.items():
            for connection in output_list:
                for target in connection:
                    print(f"       └─→ {target.get('node')} (index: {target.get('index', 0)})")
    
    # Controlla problemi comuni
    print(f"\n[4] POTENTIAL ISSUES")
    issues = []
    
    # Check 1: Workflow attivo?
    if not workflow.get('active'):
        issues.append("❌ Workflow is NOT ACTIVE")
    
    # Check 2: C'è un nodo di risposta?
    has_response_node = False
    for node in nodes:
        if 'respond' in node.get('name', '').lower() or 'response' in node.get('type', '').lower():
            has_response_node = True
            break
    
    if not has_response_node:
        issues.append("⚠️  No explicit 'Respond to Webhook' node found - might return default message")
    
    # Check 3: Webhook ha responseMode corretto?
    for node in nodes:
        if 'webhook' in node.get('type', '').lower():
            response_mode = node.get('parameters', {}).get('responseMode')
            if response_mode != 'lastNode':
                issues.append(f"⚠️  Webhook responseMode is '{response_mode}' (should be 'lastNode' for custom responses)")
    
    # Check 4: Notion node ha mapping corretto?
    for node in nodes:
        if 'notion' in node.get('type', '').lower():
            properties = node.get('parameters', {}).get('properties', {})
            if not properties:
                issues.append("❌ Notion node has NO property mapping!")
            else:
                # Verifica campi essenziali
                essential_fields = ['username', 'email', 'password']
                for field in essential_fields:
                    if field not in properties:
                        issues.append(f"⚠️  Notion missing field: {field}")
    
    if not issues:
        print("    ✅ No issues detected")
    else:
        for issue in issues:
            print(f"    {issue}")
    
    print("\n" + "=" * 80)
    return workflow

if __name__ == "__main__":
    analyze_registration_workflow()
