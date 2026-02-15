import { useNavigate } from "react-router-dom";

type NavigateToPageProps = {
    path: string;
    params?: Record<string, string>;
};

function buildPath(path: string, params?: Record<string, string>): string {
    if (!params) return path;
    return Object.entries(params).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, value),
        path
    );
}

export function useNavigateToPage({ path, params }: NavigateToPageProps) {
    const navigate = useNavigate();
    return () => navigate(buildPath(path, params));
}