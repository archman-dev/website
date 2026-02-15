#!/usr/bin/env python3
"""
Transform Showcase components from items= to sections= format.

This script:
1. Finds ALL .mdx files containing <Showcase and items={ (excluding <Checklist)
2. Transforms items prop to sections prop
3. Converts points arrays to formatted body strings with "- " bullet prefixes
4. Applies tone based on label text:
   - "positive" for: good, benefit, pattern, apply, best, do, should, healthy, right
   - "warning" for: bad, avoid, pitfall, risk, anti, don't, wrong, issue, problem
   - "neutral" otherwise

Usage:
    python transform_showcase.py [--dry-run]
"""

import os
import re
import sys
from pathlib import Path

def get_tone(label):
    """Determine tone based on label text."""
    label_lower = label.lower()
    
    positive_words = ["good", "benefit", "pattern", "apply", "best", "do", "should", "healthy", "right"]
    warning_words = ["bad", "avoid", "pitfall", "risk", "anti", "don't", "wrong", "issue", "problem"]
    
    if any(word in label_lower for word in positive_words):
        return "positive"
    elif any(word in label_lower for word in warning_words):
        return "warning"
    else:
        return "neutral"

def transform_showcase_content(content):
    """
    Transform Showcase components from items= to sections= format.
    
    Before:
        <Showcase title="..." items={[
          {label: "X", points: ["a", "b", "c"]},
          {label: "Y", points: ["d", "e"]}
        ]} />
    
    After:
        <Showcase title="..." sections={[
          {label: "X", body: "- a\n- b\n- c", tone: "neutral"},
          {label: "Y", body: "- d\n- e", tone: "neutral"}
        ]} />
    """
    
    # Find all Showcase components (don't match Checklist)
    showcase_pattern = r'(?<!Checklist)<Showcase\s+([^>]*?)items\s*=\s*\{\s*\[\s*(.*?)\s*\]\s*\}([^>]*?)/>'
    
    def replace_showcase(match):
        before_items = match.group(1)
        items_content = match.group(2)
        after_items = match.group(3)
        
        # Parse individual item objects: {label: "...", points: [...]}
        item_pattern = r'\{\s*label:\s*"([^"]*)",\s*points:\s*\[(.*?)\]\s*\}'
        
        sections = []
        for item_match in re.finditer(item_pattern, items_content, re.DOTALL):
            label = item_match.group(1)
            points_str = item_match.group(2)
            
            # Extract quoted strings from the points array
            point_pattern = r'"([^"]*)"'
            points = re.findall(point_pattern, points_str)
            
            # Format points as bullet list
            if points:
                body = "\n".join(f"- {point}" for point in points)
            else:
                body = ""
            
            tone = get_tone(label)
            sections.append((label, body, tone))
        
        # Build new sections array
        if sections:
            sections_parts = []
            for label, body, tone in sections:
                # Escape newlines in body for proper representation
                body_escaped = body.replace('\n', '\\n')
                sections_parts.append(
                    f'{{label: "{label}", body: "{body_escaped}", tone: "{tone}"}}'
                )
            
            sections_str = "[\n    " + ",\n    ".join(sections_parts) + "\n  ]"
            return f"<Showcase {before_items}sections={{{sections_str}}}{after_items}/>"
        else:
            return f"<Showcase {before_items}sections={{[]}}{after_items}/>"
    
    return re.sub(showcase_pattern, replace_showcase, content, flags=re.DOTALL)

def main():
    docs_dir = Path("/sessions/zen-hopeful-pasteur/mnt/archman.dev/docs")
    dry_run = "--dry-run" in sys.argv
    
    if not docs_dir.exists():
        print(f"Error: Directory {docs_dir} does not exist")
        return 1
    
    print("=" * 80)
    print("SHOWCASE COMPONENT TRANSFORMATION")
    print("=" * 80)
    if dry_run:
        print("Mode: DRY RUN (no files will be modified)")
    print()
    
    # Find all MDX files
    mdx_files = list(docs_dir.glob("**/*.mdx"))
    print(f"Scanning {len(mdx_files)} MDX files...")
    print()
    
    # Find files with <Showcase and items=
    files_to_process = []
    for file_path in mdx_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Only process if has <Showcase with items= and not <Checklist
                if '<Showcase' in content and 'items={' in content and '<Checklist' not in content:
                    files_to_process.append(file_path)
        except Exception as e:
            print(f"Warning: Could not read {file_path}: {e}")
    
    print(f"Found {len(files_to_process)} files with <Showcase and items={{")
    if not files_to_process:
        print()
        print("✓ All files already use sections= format or no <Showcase found!")
        return 0
    
    print()
    print("-" * 80)
    
    processed = 0
    modified = 0
    errors = []
    
    for file_path in files_to_process:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                original = f.read()
            
            transformed = transform_showcase_content(original)
            processed += 1
            
            if original != transformed:
                modified += 1
                if not dry_run:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(transformed)
                print(f"✓ {file_path.relative_to(docs_dir)}")
            else:
                print(f"⊘ {file_path.relative_to(docs_dir)} (no changes matched)")
        
        except Exception as e:
            errors.append((file_path, str(e)))
            print(f"✗ {file_path.relative_to(docs_dir)}: {e}")
    
    print()
    print("=" * 80)
    print("SUMMARY")
    print("-" * 80)
    print(f"Files processed:     {processed}")
    print(f"Files modified:      {modified}")
    print(f"Errors:              {len(errors)}")
    if errors:
        for file_path, error in errors:
            print(f"  - {file_path.relative_to(docs_dir)}: {error}")
    print()
    
    if dry_run:
        print("(Use without --dry-run to apply changes)")
    
    print("=" * 80)
    return 0

if __name__ == "__main__":
    sys.exit(main())
