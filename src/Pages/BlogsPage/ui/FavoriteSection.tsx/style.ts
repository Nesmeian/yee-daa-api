export const favoriteSectionWrapperStl = {
    background: '#c4ff61',
    alignItems: 'start',
    p: '24px',
    borderRadius: '8px',
    width: '100%',
};
export const getFavoriteSectionGridStl = (count: number) => ({
    width: '100%',
    gap: '16px',
    templateColumns: count === 1 ? '1fr' : { md: 'repeat(2, 1fr)', base: '1fr' },
});
export const favoriteSectionItemStl = {
    position: 'relative',
    background: 'white',
    borderRadius: '8px',
    p: '24px',
    alignItems: 'flex-start',
    gap: '16px',
    h: '224px',
    justifyContent: 'space-between',
} as const;
export const newRecipesCountStl = {
    top: '0',
    right: '0',
    m: '8px',
    borderRadius: '4px',
    p: '2px 8px',
    background: 'rgba(0, 0, 0, 0.06)',
    position: 'absolute',
} as const;
