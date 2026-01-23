
import requests
import json
from datetime import datetime

# Test data
test_user = {
    "username": f"test_user_{datetime.now().strftime('%H%M%S')}",
    "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
    "password": "TestPassword123!"
}

# Test diretto all'endpoint N8N
n8n_url = "https://emanueleserra.app.n8n.cloud/webhook/register"

print("Testing registration endpoint...")
print(f"User: {test_user['username']}")

try:
    response = requests.post(
        n8n_url,
        json=test_user,
        headers={"Content-Type": "application/json"},
        timeout=10
    )
    
    print(f"Status Code: {response.status_code}")
    
    # Try to parse response
    try:
        data = response.json()
        print("JSON Response:")
        print(json.dumps(data, indent=2))
        
        if response.status_code == 200 and data.get('success'):
            print("\n✅ SUCCESS - User registered!")
        else:
            print(f"\n⚠️  Unexpected response: {data}")
            
    except json.JSONDecodeError:
        print(f"Non-JSON Response: {response.text[:200]}")
    
    # Save full response
    with open("test_registration_result.txt", "w", encoding="utf-8") as f:
        f.write(f"Test Time: {datetime.now()}\n")
        f.write(f"Status: {response.status_code}\n")
        f.write(f"Headers: {dict(response.headers)}\n\n")
        f.write(f"Response:\n{response.text}")
    
    print("\nFull response saved to test_registration_result.txt")

except Exception as e:
    print(f"❌ ERROR: {str(e)}")
