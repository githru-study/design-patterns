const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn;

const types = ['behavioral', 'creational', 'structural']

const readFromDirectory = async (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) reject(err)
            resolve(files)
        })
    })
}

const readFile = async (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(dirPath, (err, file) => {
            if (err) reject(err)
            resolve(file)
        })
    })
}
const writeFile = async (dirPath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(dirPath, data, (err, file) => {
            if (err) reject(err)
            resolve(file)
        })
    })
}

const isFile = async (filenameWithPath) => {
    return new Promise((resolve, reject) => {
        fs.stat(filenameWithPath, (err, stats) => {
            if (err) reject(err)
            resolve(stats.isFile())
        })
    })
}

const getAllFilePath = async (basePath) => {
    const dirPath = path.join(process.cwd(), basePath)
    const names = (await readFromDirectory(dirPath)).map(name => ['', name])
    const filePaths = []
    for (const [dir, name] of names) {
        const joined = path.join(dirPath, dir, name)
        if (await isFile(joined)) {
            filePaths.push([dir, name].join('/'))
        } else {
            names
                .push(
                    ...(await readFromDirectory(joined))
                        .map((foundName) => [[dir, name].join('/'), foundName])
                )
        }
    }
    return filePaths
}

const spawnProcess = async (command, args) => {
    return new Promise((resolve) => {
        const child = spawn(command, args);
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function(data) {
            resolve(data);
        });
    });
}

const makeMeta = async (contents, pathName, type) => {
    const title = contents.trim().split('\n')[0].replace('#', '').trim();
    const [author, date] = (await spawnProcess('git', ['log', '-1', '--format=%an@%ad', path.join(process.cwd(), type, pathName)])).trim().split('@');
    return `---
title: ${title}
author: ${author}
date: ${date}
type: ${type}
---
`
}

(async () => {
    for (const type of types) {
        const paths = (await getAllFilePath(type)).filter(x => x.includes('.md'));
        for (const pathName of paths) {
            const contents = (await readFile(`${type}${pathName}`)).toString()
            if (contents.startsWith('---')) {
                continue;
            }
            await writeFile(path.join(process.cwd(), type, pathName), await makeMeta(contents, pathName, type) + contents);
        }
    }
})();
