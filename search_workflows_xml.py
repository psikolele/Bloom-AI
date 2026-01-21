
import zipfile
import os
import xml.etree.ElementTree as ET
import re

xlsx_file = "n8n Automation Excel Sheet – 2000+ Workflows.xlsx"
keywords = ["Instagram", "Social Media", "Post", "Caption", "Generate", "Idea"]

def get_shared_strings(zip_ref):
    try:
        with zip_ref.open('xl/sharedStrings.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            # Namespace is usually necessary
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            # Strings are in <si><t>...
            return [str(t.text) for t in root.findall('.//ns:t', ns)]
    except Exception as e:
        print(f"Error reading shared strings: {e}")
        return []

def search_sheet(zip_ref, shared_strings):
    found_rows = []
    
    try:
        with zip_ref.open('xl/worksheets/sheet1.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            
            for row in root.findall('.//ns:row', ns):
                row_values = []
                has_link = False
                
                # Iterate cells
                for c in row.findall('ns:c', ns):
                    cell_type = c.get('t')
                    v_node = c.find('ns:v', ns)
                    val = ""
                    
                    if v_node is not None:
                        if cell_type == 's': # shared string
                            idx = int(v_node.text)
                            if idx < len(shared_strings):
                                val = shared_strings[idx]
                        else:
                            val = str(v_node.text)
                    
                    # Check for inline string (rare but possible)
                    is_node = c.find('ns:is', ns)
                    if is_node is not None:
                        t_node = is_node.find('ns:t', ns)
                        if t_node is not None:
                            val = str(t_node.text)

                    if val:
                        row_values.append(val)
                        if "http" in val:
                            has_link = True
                
                # Check keywords
                row_text = " ".join(row_values)
                if any(k.lower() in row_text.lower() for k in keywords):
                    found_rows.append(row_values)

    except Exception as e:
        print(f"Error reading sheet1: {e}")
        
    return found_rows

try:
    with zipfile.ZipFile(xlsx_file, 'r') as zip_ref:
        strings = get_shared_strings(zip_ref)
        results = search_sheet(zip_ref, strings)
        
        print(f"Found {len(results)} matching rows:\n")
        for res in results:
            # Filter empty strings and print
            clean_res = [x for x in res if x.strip()]
            print(" | ".join(clean_res))
            print("-" * 40)

except Exception as e:
    print(f"Main Error: {e}")
