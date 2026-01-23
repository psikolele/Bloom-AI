import requests
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

NOTION_API_KEY = os.getenv("NOTION_API_KEY")
DATABASE_ID = "16ae535846dd4846b2fb2c1f56bd596d"

headers = {
    "Authorization": f"Bearer {NOTION_API_KEY}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

print("=" * 80)
print("VERIFYING NOTION DATABASE - Recent Registrations")
print("=" * 80)

# Query the database for recent entries
url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"

payload = {
    "sorts": [
        {
            "timestamp": "created_time",
            "direction": "descending"
        }
    ],
    "page_size": 10
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    results = data.get("results", [])
    
    print(f"\n📊 Found {len(results)} recent entries:\n")
    
    test_users = ["test_user_131132", "browser_final_test"]
    
    for i, page in enumerate(results, 1):
        props = page.get("properties", {})
        
        # Extract properties
        name = ""
        if "Name" in props and props["Name"]["type"] == "title":
            title_arr = props["Name"]["title"]
            if title_arr:
                name = title_arr[0]["plain_text"]
        
        email = ""
        if "Email" in props and props["Email"]["type"] == "email":
            email = props["Email"]["email"] or "N/A"
        
        created = page.get("created_time", "N/A")
        page_id = page.get("id", "N/A")
        
        # Check if this is one of our test users
        is_test = name in test_users
        marker = "✅ TEST USER" if is_test else ""
        
        print(f"#{i} {marker}")
        print(f"   Name: {name}")
        print(f"   Email: {email}")
        print(f"   Created: {created}")
        print(f"   Page ID: {page_id[:20]}...")
        print()
    
    # Verify our test users
    print("\n" + "=" * 80)
    print("VERIFICATION SUMMARY")
    print("=" * 80)
    
    found_users = [page["properties"]["Name"]["title"][0]["plain_text"] 
                   for page in results 
                   if page["properties"].get("Name", {}).get("title")]
    
    for test_user in test_users:
        if test_user in found_users:
            print(f"✅ {test_user} - FOUND in Notion database")
        else:
            print(f"❌ {test_user} - NOT FOUND")
    
    print("=" * 80)
    
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)
