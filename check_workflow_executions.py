import requests
import os
import json
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

N8N_API_KEY = os.getenv("N8N_API_KEY")
N8N_BASE_URL = "https://emanueleserra.app.n8n.cloud/api/v1"
WORKFLOW_ID = "2WKzb93sJnfLO1Bv"

headers = {"X-N8N-API-KEY": N8N_API_KEY}

print("=" * 80)
print("CHECKING RECENT WORKFLOW EXECUTIONS")
print("=" * 80)

# Get recent executions
url = f"{N8N_BASE_URL}/executions"
params = {"workflowId": WORKFLOW_ID, "limit": 10}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    executions = response.json()
    
    if "data" in executions:
        print(f"\n📊 Found {len(executions['data'])} recent executions:\n")
        
        for i, execution in enumerate(executions['data'][:5], 1):
            exec_id = execution.get('id')
            status = execution.get('status')
            finished = execution.get('stoppedAt', 'N/A')
            mode = execution.get('mode', 'N/A')
            
            status_emoji = "✅" if status == "success" else "❌" if status == "error" else "⚠️"
            
            print(f"{status_emoji} Execution #{i}")
            print(f"   ID: {exec_id}")
            print(f"   Status: {status}")
            print(f"   Mode: {mode}")
            print(f"   Finished: {finished}")
            
            # Get detailed execution data
            detail_url = f"{N8N_BASE_URL}/executions/{exec_id}"
            detail_response = requests.get(detail_url, headers=headers)
            
            if detail_response.status_code == 200:
                detail = detail_response.json()
                
                # Check for errors
                if status == "error" and "data" in detail:
                    exec_data = detail["data"]
                    if "resultData" in exec_data and "error" in exec_data["resultData"]:
                        error = exec_data["resultData"]["error"]
                        print(f"   ⚠️ Error: {error.get('message', 'Unknown error')}")
                    
                    # Check node execution data
                    if "executionData" in exec_data:
                        node_data = exec_data["executionData"]
                        if "resultData" in node_data and "runData" in node_data["resultData"]:
                            run_data = node_data["resultData"]["runData"]
                            print(f"   📝 Nodes executed: {', '.join(run_data.keys())}")
                            
                            # Check for node-specific errors
                            for node_name, node_runs in run_data.items():
                                for run in node_runs:
                                    if "error" in run:
                                        print(f"   ❌ Error in '{node_name}': {run['error'].get('message', 'Unknown')}")
            
            print()
    else:
        print("No executions found")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

print("=" * 80)
