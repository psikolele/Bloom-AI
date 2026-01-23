import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()

N8N_API_KEY = os.getenv("N8N_API_KEY")
N8N_BASE_URL = "https://emanueleserra.app.n8n.cloud/api/v1"
WORKFLOW_ID = "2WKzb93sJnfLO1Bv"

headers = {"X-N8N-API-KEY": N8N_API_KEY}

print("=" * 80)
print("CHECKING WORKFLOW EXECUTION SUCCESS")
print("=" * 80)

# Get recent executions
url = f"{N8N_BASE_URL}/executions"
params = {"workflowId": WORKFLOW_ID, "limit": 5}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    executions = response.json()
    
    if "data" in executions:
        print(f"\n📊 Recent executions: {len(executions['data'])}\n")
        
        for i, execution in enumerate(executions['data'], 1):
            exec_id = execution.get('id')
            status = execution.get('status')
            finished = execution.get('stoppedAt', 'N/A')
            
            status_emoji = "✅" if status == "success" else "❌" if status == "error" else "⚠️"
            
            print(f"{status_emoji} Execution #{i}")
            print(f"   ID: {exec_id}")
            print(f"   Status: {status}")
            print(f"   Finished: {finished}")
            
            # Get execution details
            detail_url = f"{N8N_BASE_URL}/executions/{exec_id}"
            detail_response = requests.get(detail_url, headers=headers)
            
            if detail_response.status_code == 200:
                detail = detail_response.json()
                
                # Save the most recent execution for inspection
                if i == 1:
                    with open("latest_execution.json", "w", encoding="utf-8") as f:
                        json.dump(detail, f, indent=2)
                    print("   💾 Saved to latest_execution.json")
                
                # Extract webhook data
                if "data" in detail and "executionData" in detail["data"]:
                    exec_data = detail["data"]["executionData"]
                    if "resultData" in exec_data and "runData" in exec_data["resultData"]:
                        run_data = exec_data["resultData"]["runData"]
                        
                        # Check webhook input
                        if "Webhook" in run_data:
                            webhook_data = run_data["Webhook"][0]["data"]["main"][0][0]["json"]
                            if "body" in webhook_data:
                                body = webhook_data["body"]
                                print(f"   📥 Input: username={body.get('username')}, email={body.get('email')}")
                        
                        # Check Notion output
                        if "Notion" in run_data:
                            notion_status = "✅ SUCCESS" if run_data["Notion"][0].get("data") else "❌ FAILED"
                            print(f"   🗄️ Notion: {notion_status}")
                        
                        # Check response
                        if "Set Success Response" in run_data:
                            response_data = run_data["Set Success Response"][0]["data"]["main"][0][0]["json"]
                            print(f"   📤 Response: {response_data}")
            
            print()
    else:
        print("No executions found")
        
    print("=" * 80)
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)
