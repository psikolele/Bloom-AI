import json

# Load the current workflow
with open('current_workflow.json', 'r', encoding='utf-8-sig') as f:
    workflow = json.load(f)

# Find nodes
webhook_node = next(n for n in workflow['nodes'] if n['name'] == 'Webhook')
notion_node = next(n for n in workflow['nodes'] if n['name'] == 'Notion')

# 1. Fix Webhook Response Mode
# Set responseMode to 'lastNode' so it returns the JSON from the "Respond to Webhook" node
webhook_node['parameters']['responseMode'] = 'lastNode'

# 2. Fix Notion Email Mapping
# Check if Email is already mapped
properties = notion_node['parameters']['propertiesUi']['propertyValues']
email_mapped = any(p.get('key') == 'Email|email' for p in properties)

if not email_mapped:
    # Add Email mapping
    # We insert it after Name for cleanliness, or just append
    properties.insert(1, {
        "key": "Email|email",
        "emailValue": "={{ $json.body.email }}"
    })

# Save updated workflow
# Remove read-only fields that cause API errors
# N8N API requires settings but is strict about content
keys_to_keep = {'name', 'nodes', 'connections', 'settings'}
cleaned_workflow = {k: v for k, v in workflow.items() if k in keys_to_keep}

# Sanitize settings
# API is rejecting specific keys, so we try sending empty settings to let N8N use defaults
if 'settings' in cleaned_workflow:
     cleaned_workflow['settings'] = {}

with open('updated_workflow.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_workflow, f, indent=4)

print("Workflow updated and cleaned successfully.")
