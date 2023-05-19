import {SwagSectionsConfig} from "../config";

export const getEmbeddingPoint = (embeds, routePath) => {
    const repository = embeds.find(embed => Object.keys(embed.points).find(point => routePath.startsWith(point)));
    if (!repository) {
        return {
            repository: 'unknown',
            version: 'main',
            branch: 'main',
            folder: '.',
        };
    }

    const point = Object.keys(repository.points).find(point => routePath.startsWith(point));
    return {
        repository: repository.repository,
        version: repository.points[point],
        folder: repository.folder,
        branch: repository.points[point],
        dst: point,
        hasMultiple: Object.keys(repository.points).length > 1,
    };
}

export const getSection = (sections: SwagSectionsConfig[], routePath: string): string => {
    return sections.find((section: SwagSectionsConfig) => section.matches.find(match => routePath.startsWith(match)))?.title || 'Documentation';
}

export const getEditLink = ({relativePath, embeds}: { relativePath: string, embeds: [] }) => {
    const routePath = `/${relativePath.replace('.html', '.md')}`;
    const embeddingPoint = getEmbeddingPoint(embeds ?? [], routePath)

    const repo = embeddingPoint.repository;
    const branch = embeddingPoint.branch || "main";
    const dst = embeddingPoint.dst || "/";
    let folder = embeddingPoint.folder || "main";
    if (folder !== '.') {
        folder = `/${folder}`;
    } else {
        folder = '';
    }

    return `https://github.com/shopware/${repo}/edit/${branch}${folder}/${relativePath.substring(dst.length - 1)}`;
}