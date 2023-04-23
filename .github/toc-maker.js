const fs = require('fs')
const path = require('path')

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

const replaceWriting = (fileContents, toReplaced) => {
    return fileContents.replace(/(<!-- toc starts -->)(.|\n)*(<!-- toc ends -->)/, toReplaced)
}

(async () => {
    const paths = (await Promise.all(types.map(type => getAllFilePath(type))))
        .map((pathsInType, idx) => pathsInType
            .filter(x => x.includes('.md'))
            .map(x => `[${x.slice(x.lastIndexOf('/') + 1, x.indexOf('.'))}](./${types[idx]}${x})`)
        )

    // TODO: readme 내에서 제목 가져오기
    const toc = types.map((type, idx) => `### ${type}\n\n- ${paths[idx].join('\n- ')}`).join('\n\n')

    const readme = (await readFile(path.join(process.cwd(), 'README_TEMPLATE.md'))).toString()
    await writeFile(path.join(process.cwd(), 'README.md'), replaceWriting(readme, toc))
})()
