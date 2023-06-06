export const expectEmptyRootPath = (result) => {
    expect(result.stdout).toContain('No value for dir.root');
    expect(result.stdout.split("\n").reverse()[0]).toContain('Enter root path for ALL of your projects');
}

export const expectEmptyDeveloperPortalPath = (result) => {
    expect(result.stdout).toContain('No value for dir.developer-portal');
    expect(result.stdout).toContain('Enter path for your local install of developer-portal');
}