
import zipfile
import os
import re

xlsx_file = "n8n Automation Excel Sheet – 2000+ Workflows.xlsx"
extract_dir = "temp_xlsx_extract"

if not os.path.exists(extract_dir):
    os.makedirs(extract_dir)

try:
    with zipfile.ZipFile(xlsx_file, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    
    # Search for links in sharedStrings.xml and worksheets
    found_links = set()
    
    for root, dirs, files in os.walk(extract_dir):
        for file in files:
            if file.endswith(".xml"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # improved regex for urls
                    links = re.findall(r'https?://[^\s<"]+', content)
                    for link in links:
                        # Clean up some xml artifacts if any
                        link = link.split('<')[0]
                        found_links.add(link)
    
    print("Found Links:")
    for link in sorted(list(found_links)):
        print(link)

except Exception as e:
    print(f"Error: {e}")
