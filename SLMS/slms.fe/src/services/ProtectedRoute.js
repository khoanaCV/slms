import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';



const getUser = () => {
    const currentToken = localStorage.getItem('token');
    //Mã hoá token
    const dataDecoded = jwtDecode(currentToken);
    return dataDecoded;
};

const isAdmin = () => {
    const user = getUser();
    return user && user.roleId === '3' && user.permissionId === '6';
};
const isAuthenticated = () => {
    // Giả sử kiểm tra đăng nhập thông qua localStorage hoặc cách khác
    return localStorage.getItem('token') ? true : false;
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Nếu không được xác thực, chuyển hướng đến trang đăng nhập
        return <Navigate to="/account/login" replace state={{ from: location }} />;
    } else if (requireAdmin && !isAdmin()) {
        // Nếu yêu cầu quyền admin mà người dùng không phải admin, chuyển hướng về trang chính
        return <Navigate to="/" />;
    }

    return children;
};

export { ProtectedRoute }