const parseType = (contactType) => {
    if (typeof contactType !== 'string') return;

    const validType = ['work', 'home', 'personal'];
    if (validType.includes(contactType)) return contactType;
};

const parseFavourite = (isFavourite) => {
    if (typeof isFavourite !== 'string') return;

    const validValues = ['true', 'false'];
    if (validValues.includes(isFavourite)) return isFavourite;
};

export const parseFilteredParams = (query) => {
    const { isFavourite, contactType } = query;

    const parsedFavourite = parseFavourite(isFavourite);
    const parsedType = parseType(contactType);

    return {
        contactType: parsedType,
        isFavourite: parsedFavourite === 'true' ? true : parsedFavourite === 'false' ? false : undefined,
    };
};