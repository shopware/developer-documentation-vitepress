
export const getEmbeddingPoint = (embeds, routePath) => {
    const repository = embeds.find(embed => Object.keys(embed.points).find(point => routePath.startsWith(point)));
    if (!repository) {
        return {
            repository: 'unknown',
            version: 'none',
            branch: 'none',
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
    };
}