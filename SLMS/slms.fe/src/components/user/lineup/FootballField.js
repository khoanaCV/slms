import React, { useRef, useEffect, useState } from 'react';



const drawPlayer = (ctx, player, width, height, isSelected) => {
    if (player.active) {
        const posX = (width * player.x) / 100;
        const posY = (height * player.y) / 100;

        // Nếu cầu thủ được chọn, thay đổi màu sắc
        ctx.fillStyle = isSelected ? 'green' : 'blue';
        ctx.beginPath();
        ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
        ctx.fill();

        // Vẽ tên và số áo dưới cầu thủ
        ctx.font = "12px Arial";
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";
        ctx.fillText(player.name, posX, posY + 20);
        ctx.fillText(player.number, posX, posY + 35);
    }
};
const FootballField = ({ players, onPlayersChange }) => {
    const canvasRef = useRef(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const drawField = (ctx, width, height) => {
        // Mã vẽ sân bóng ở đây
        // Đặt màu nền xanh cho sân bóng
        ctx.fillStyle = '#0B6623';
        ctx.fillRect(0, 0, width, height);

        // Vẽ đường viền ngoài cùng
        ctx.strokeStyle = '#8d8d8d';
        ctx.lineWidth = 2; // bạn có thể thiết lập độ dày của đường viền
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // Vẽ đường giữa sân
        ctx.beginPath();
        ctx.moveTo(10, height / 2);
        ctx.lineTo(width - 10, height / 2);
        ctx.stroke();

        // Vẽ vòng tròn giữa sân
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 40, 0, 2 * Math.PI);
        ctx.stroke();

        // Vẽ khu phạt đền phía trên
        ctx.strokeRect((width - 100) / 2, 10, 100, 60);

        // Vẽ khu phạt đền phía dưới
        ctx.strokeRect((width - 100) / 2, height - 70, 100, 60);

        // Vẽ khung thành phía trên
        ctx.strokeRect((width - 50) / 2, 0, 50, 10);

        // Vẽ khung thành phía dưới
        ctx.strokeRect((width - 50) / 2, height - 10, 50, 10);

        // Vẽ điểm giữa sân
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 2, 0, 2 * Math.PI);
        ctx.fill();

    };


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            drawField(ctx, width, height);
            players.forEach(player => {
                const isSelected = selectedPlayer && player.id === selectedPlayer.id;
                drawPlayer(ctx, player, width, height, isSelected);
            });
        };

        draw();
    }, [players, selectedPlayer]);
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;    // aspect ratio for X
        const scaleY = canvasRef.current.height / rect.height;  // aspect ratio for Y
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const clickedPlayer = players.find(player => {
            const posX = (canvasRef.current.width * player.x) / 100;
            const posY = (canvasRef.current.height * player.y) / 100;
            return Math.hypot(posX - x, posY - y) < 10; // click range check
        });

        setSelectedPlayer(clickedPlayer || null);
    };

    const handleMouseMove = (e) => {
        if (selectedPlayer) {
            const rect = canvasRef.current.getBoundingClientRect();
            const scaleX = canvasRef.current.width / rect.width;
            const scaleY = canvasRef.current.height / rect.height;
            const x = ((e.clientX - rect.left) * scaleX) / canvasRef.current.width * 100;
            const y = ((e.clientY - rect.top) * scaleY) / canvasRef.current.height * 100;

            // Update the player's position and re-render
            onPlayersChange(players.map(player => {
                return player.id === selectedPlayer.id ? { ...player, x, y } : player;
            }));
        }
    };

    const handleMouseUp = () => {
        setSelectedPlayer(null);
    };

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ border: '1px solid #000' }}
        />
    );
};

export default FootballField;
