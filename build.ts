import { exec, execSync } from 'child_process';
import fs from 'fs';

const config : any = {
    hugoCommand: 'hugo',
    sourceDir: 'submodules/tgj-vault', // TODO: Pull submodule if not present
    destDir: 'content', // Hugo's default content directory
};

function checkDependencies(): void {
    try {
        execSync('hugo version', { stdio: 'ignore' });
    } catch (error) {
        console.error('Hugo is not installed or not found in PATH. Please install Hugo to proceed.');
        process.exit(1);
    }

    try {
        execSync('obsidian-export --version', { stdio: 'ignore' });
    } catch (error) {
        try {
            execSync('cargo --version', { stdio: 'ignore' });
        } catch (cargoError) {
            console.error('Cargo (Rust package manager) is not installed or not found in PATH. Please install Rust and Cargo to proceed.');
            process.exit(1);
        }
        try {
            console.log('Installing obsidian-export via cargo...');
            execSync('cargo install obsidian-export', { stdio: 'inherit' });
        } catch (installError) {
            console.error('Failed to install obsidian-export. Please install it manually.');
            process.exit(1);
        }
    }

    console.log('All dependencies are installed, continuing...');
}

function buildHugoSite(): void {
    console.log('Building Hugo site...');
    try {
        execSync(config.hugoCommand, { stdio: 'inherit' });
        console.log('Hugo site built successfully.');
    } catch (error) {
        console.error('Error building Hugo site:', error);
        process.exit(1);
    }
}

function convertObsidianVault(): void {
    const srcDir : string = config.sourceDir;
    const destDir : string = config.destDir;
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    else {
        fs.rmSync(destDir, { recursive: true, force: true });
        fs.mkdirSync(destDir, { recursive: true });
    }
    console.log(`Converting Obsidian vault from ${srcDir} to Hugo-compatible format...`);
    try {
        execSync(`obsidian-export "${srcDir}" "${destDir}" --frontmatter=always`, { stdio: 'inherit' });
        console.log('Obsidian vault converted successfully.');
    } catch (error) {
        console.error('Error converting Obsidian vault:', error);
        process.exit(1);
    }

    // Post-process markdown files to convert date to ISO 8601 format
    fs.readdirSync(destDir, { recursive: true }).forEach(file => {
        console.log(`Post-processing file: ${file}`);
        if (file.endsWith('.md')) {
            const filePath = `${destDir}/${file}`;
            let content = fs.readFileSync(filePath, 'utf-8');
            const frontMatterRegex = /---\n((.|\n)*?)---/;
            const dateRegex = /(?<=date:).*/;
            const frontmatter = content.match(frontMatterRegex);
            if (!frontmatter) {
                return;
            }
            const date = frontmatter[0].match(dateRegex);
            if (!date) {
                return;
            }
            const convertedDate = new Date(date[0].trim()).toISOString();
            console.log('Date: ', date);
            content = content.replace(dateRegex, ` ${convertedDate}`);
            fs.writeFileSync(filePath, content, 'utf-8');
        }
    });
}

function copyContent(): void {
    const srcDir : string = config.sourceDir;
    const destDir : string = config.destDir;
    var ignoredFiles : string[] = config.ignoredFiles;
    ignoredFiles = ignoredFiles.map((file: string) => file.replace(/\/+$/, '')); // Remove trailing slashes

    console.log(`Copying articles from ${srcDir} to ${destDir}...`);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    else {
        fs.rmSync(destDir, { recursive: true, force: true });
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.readdirSync(srcDir).forEach(file => {
        console.log(`Processing file: ${file}`);
        if (ignoredFiles.some(ignored => file.startsWith(ignored))) {
            return;
        }
        fs.cpSync(`${srcDir}/${file}`, `${destDir}/${file}`, {'recursive': true});
    });
    console.log('Articles copied successfully.');
}

checkDependencies();
//copyContent();
convertObsidianVault();
buildHugoSite();