export const trackTitleFilter = (trackTitle: string) => (track: any) =>
	track.title?.toLowerCase().includes(trackTitle.toLowerCase())
