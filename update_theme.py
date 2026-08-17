import os
import re
import glob

# Pattern mappings
replacements = [
    # 1. Backgrounds to bg-bg-base
    (r'bg-\[#0B0F19\](\/[0-9]*)?', 'bg-bg-base'),
    (r'bg-\[#080d19\](\/[0-9]*)?', 'bg-bg-base'),
    (r'bg-\[#080B14\](\/[0-9]*)?', 'bg-bg-base'),

    # 2. Card Backgrounds to bg-bg-card
    (r'bg-\[#0d1424\](\/[0-9]*)?', 'bg-bg-card'),
    (r'bg-\[#111827\](\/[0-9]*)?', 'bg-bg-card'),
    (r'bg-\[#111622\](\/[0-9]*)?', 'bg-bg-card'),
    (r'bg-\[#111a2c\](\/[0-9]*)?', 'bg-bg-card'),
    (r'bg-\[#11162277\]', 'bg-bg-card'),
    (r'bg-slate-900', 'bg-bg-card'),

    # 3. Borders to border-border-subtle
    (r'border-slate-800(\/80)?', 'border-border-subtle'),
    (r'border-slate-700(\/60)?', 'border-border-subtle'),

    # 4. Text main colors
    (r'text-slate-50', 'text-text-main'),
    (r'text-slate-200', 'text-text-main'),
    (r'text-white', 'text-text-main'),

    # 5. Text muted colors
    (r'text-slate-400', 'text-text-muted'),
    (r'text-slate-300', 'text-text-muted'),
    (r'text-slate-500', 'text-text-muted'),
]

# Explicit exclusions / restorations for buttons where text should remain white
restorations = [
    ('bg-purple-600 text-text-main', 'bg-purple-600 text-white'),
    ('hover:text-text-main hover:bg-slate-800', 'hover:text-text-main hover:bg-bg-hover'), # Also fix hover bg
    ('hover:text-text-main hover:bg-slate-700', 'hover:text-text-main hover:bg-bg-hover'),
    ('bg-primary text-text-main', 'bg-primary text-white'),
    ('hover:text-text-main border border-transparent', 'hover:text-white border border-transparent'),
    ('bg-indigo-500 text-text-main', 'bg-indigo-500 text-white'),
    ('bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-text-main', 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white'),
    ('bg-slate-800', 'bg-bg-hover'),
]

jsx_files = glob.glob('src/**/*.jsx', recursive=True)

for filepath in jsx_files:
    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
        
    for search_str, repl in restorations:
        content = content.replace(search_str, repl)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

print("Theme update complete.")
