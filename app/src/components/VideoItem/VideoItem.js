import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMeasurePosition } from '../../hooks/useMeasurePosition';

export default function VideoItem({video, updateOrder, updatePosition, index, onPlaylistReorder}) {
    const [isDragged, setIsDragged] = useState(false);
    const itemRef = useMeasurePosition(pos => updatePosition(index, pos));

    const dragEndHandler = () => {
        setIsDragged(false);
        onPlaylistReorder();
    } 

    return (
        <motion.div
            style={{
                zIndex: isDragged ? 2 : 1,
            }}
            dragConstraints={{
                top: 0,
                bottom: 0
            }}
            dragElastic={1}
            layout
            ref={itemRef}
            onDragStart={() => setIsDragged(true)}
            onDragEnd={dragEndHandler}
            animate={{
                scale: isDragged ? 1.05 : 1
            }}
            onViewportBoxUpdate={(_, delta) => {
                isDragged && updateOrder(index, delta.y.translate);
            }}
            drag="y"
            data-testid={"video-item"}>
                <div className="p-3 bg-white cursor-pointer">
                    <h1 className="text-lg">
                        {video.title}
                    </h1>
                    <h6 className="text-sm text-right text-gray-400">
                        {video.duration}
                    </h6>
                </div>
        </motion.div>
    )
}
