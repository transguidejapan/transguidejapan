from obsidian_to_hugo import ObsidianToHugo


def filter_file(file_contents: str, file_path: str) -> bool:
    excluded_files = [
        "scripts/",
        "templates/"
    ]
    # do something with the file path and contents
    for file_name in excluded_files:
        if file_name not in file_path:
            return True  # copy file
    else:
        return False  # skip file


obsidian_to_hugo = ObsidianToHugo(
    obsidian_vault_dir="submodules/tgj-vault",
    hugo_content_dir="content",
    filters=[filter_file],
)

obsidian_to_hugo.run()
