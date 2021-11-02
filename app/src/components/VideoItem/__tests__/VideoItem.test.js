import { render, screen, fireEvent } from '@testing-library/react';
import VideoItem from './../VideoItem';

const video = {
    id: 1,
    videoId: "Kt-tLuszKBA",
    url: "https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords",
    title: "some title",
    duration: "04:23"
}
const mockUpdateOrder = jest.fn();
const updatePosition = jest.fn();
const onPlaylistReorder = jest.fn();

describe("VideoItem", () => {
    it('should show video item title', () => {
        render(<VideoItem 
            video={video}
            updateOrder={mockUpdateOrder}
            updatePosition={updatePosition}
            index={0}
            onPlaylistReorder={onPlaylistReorder}
        />);
        const textElement = screen.getByText(video.title);
        expect(textElement).toBeVisible();
    });

    it('should show video item duration', () => {
        render(<VideoItem 
            video={video}
            updateOrder={mockUpdateOrder}
            updatePosition={updatePosition}
            index={0}
            onPlaylistReorder={onPlaylistReorder}
        />);
        const textElement = screen.getByText(video.duration);
        expect(textElement).toBeVisible();
    });
});