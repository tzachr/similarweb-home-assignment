import { render, screen } from '@testing-library/react';
import VideosList from './../VideosList';
import useVideos from './../../../hooks/useVideos';

const videos = [
    {
        id: 1,
        videoId: "Kt-tLuszKBA",
        url: "https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords",
        title: "some title1",
        duration: "04:23"
    },
    {
        id: 2,
        videoId: "Kt-tLasddas",
        url: "https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords",
        title: "some title2",
        duration: "03:23"
    }
]

jest.mock('./../../../hooks/useVideos');

describe("VideosList", () => {
    it('should show video item title', () => {
        useVideos.mockReturnValue({
            addVideo: jest.fn(),
            videos,
            setVideos: jest.fn(), 
            updatePlaylist: jest.fn()
        });
        render(<VideosList />);
        const divElements = screen.getAllByTestId("video-item");
        expect(divElements.length).toBe(2);
    });
});