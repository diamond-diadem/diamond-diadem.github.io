#!/usr/bin/env python3
import yaml, json, sys, pathlib

def yaml_to_json(yaml_file, json_file=None):
    yaml_path = pathlib.Path(yaml_file)
    if json_file is None:
        json_path = yaml_path.with_suffix(".json")
    else:
        json_path = pathlib.Path(json_file)

    with open(yaml_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Converted {yaml_path} → {json_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: yaml2json.py people.yaml [people.json]")
        sys.exit(1)

    yaml_file = sys.argv[1]
    json_file = sys.argv[2] if len(sys.argv) > 2 else None
    yaml_to_json(yaml_file, json_file)
