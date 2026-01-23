
import requests

WEBHOOK_URL = "https://emanueleserra.app.n8n.cloud/webhook/caption-flow"
ORIGIN = "https://caption-flow-nu.vercel.app"

print("Testing CORS Preflight (OPTIONS request)...")
print(f"URL: {WEBHOOK_URL}")
print(f"Origin: {ORIGIN}")
print()

# Simulate browser preflight
headers = {
    "Origin": ORIGIN,
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "Content-Type"
}

try:
    response = requests.options(WEBHOOK_URL, headers=headers, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"\nResponse Headers:")
    for key, value in response.headers.items():
        if 'access-control' in key.lower() or 'origin' in key.lower():
            print(f"  {key}: {value}")
    
    print(f"\nAll Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    
    # Check if CORS headers are present
    cors_origin = response.headers.get('Access-Control-Allow-Origin')
    cors_methods = response.headers.get('Access-Control-Allow-Methods')
    cors_headers = response.headers.get('Access-Control-Allow-Headers')
    
    print(f"\n=== CORS Analysis ===")
    if cors_origin:
        print(f"✅ Access-Control-Allow-Origin: {cors_origin}")
    else:
        print("❌ Access-Control-Allow-Origin: MISSING - This causes CORS errors!")
    
    if cors_methods:
        print(f"✅ Access-Control-Allow-Methods: {cors_methods}")
    else:
        print("❌ Access-Control-Allow-Methods: MISSING")
    
    if cors_headers:
        print(f"✅ Access-Control-Allow-Headers: {cors_headers}")
    else:
        print("❌ Access-Control-Allow-Headers: MISSING")

except Exception as e:
    print(f"Error: {e}")
