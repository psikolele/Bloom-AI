
import pandas as pd
import sys

file_path = "n8n Automation Excel Sheet – 2000+ Workflows.xlsx"

try:
    df = pd.read_excel(file_path)
    print("Columns:", df.columns.tolist())
    print("First 5 rows:")
    print(df.head())
    
    # Try to find columns that look like links
    for col in df.columns:
        if df[col].astype(str).str.contains('http').any():
            print(f"\nPotential links in column '{col}':")
            print(df[col].dropna().head().tolist())

except Exception as e:
    print(f"Error reading excel: {e}")
