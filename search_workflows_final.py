
import zipfile
import os
import xml.etree.ElementTree as ET

xlsx_file = "n8n Automation Excel Sheet – 2000+ Workflows.xlsx"
keywords = ["Instagram"]
output_file = "found_workflows.txt"

def get_shared_strings(zip_ref):
    try:
        with zip_ref.open('xl/sharedStrings.xml') as f:
            tree = ET.parse(f)
            root = tree.getroot()
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            return [str(t.text) for t in root.findall('.//ns:t', ns)]
    except Exception as e:
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
                for c in row.findall('ns:c', ns):
                    cell_type = c.get('t')
                    v_node = c.find('ns:v', ns)
                    val = ""
                    if v_node is not None:
                        if cell_type == 's':
                            idx = int(v_node.text)
                            if idx < len(shared_strings):
                                val = shared_strings[idx]
                        else:
                            val = str(v_node.text)
                    is_node = c.find('ns:is', ns)
                    if is_node is not None:
                        t_node = is_node.find('ns:t', ns)
                        if t_node is not None:
                            val = str(t_node.text)

                    if val:
                        row_values.append(val)
                
                row_text = " ".join(row_values)
                # Check for Instagram AND (OpenAI or GPT or Generator or Post)
                if "instagram" in row_text.lower():
                     found_rows.append(row_values)

    except Exception as e:
        pass
    return found_rows

with open(output_file, "w", encoding="utf-8") as out:
    try:
        with zipfile.ZipFile(xlsx_file, 'r') as zip_ref:
            strings = get_shared_strings(zip_ref)
            results = search_sheet(zip_ref, strings)
            
            out.write(f"Found {len(results)} workflows:\n\n")
            for res in results:
                clean_res = [x for x in res if x.strip()]
                line = " | ".join(clean_res)
                out.write(line + "\n" + "-"*40 + "\n")
    except Exception as e:
        out.write(f"Error: {e}")
