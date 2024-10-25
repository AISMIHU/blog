// 날짜 목록 정의 (최신 날짜가 먼저 오도록 배열 순서 설정)
const dates = ['2024-10-25', '2024-10-24', '2024-10-23'];

// Markdown 파일을 읽어와서 HTML로 변환 후 해당 날짜 div에 삽입
async function loadMarkdown(fileName, elementId) {
    try {
        const response = await fetch(`/posts/blog/${fileName}.md`);
        if (!response.ok) {
            throw new Error(`Markdown 파일을 불러오는 중 오류 발생: ${fileName}`);
        }
        const markdownText = await response.text();
        const htmlContent = marked.parse(markdownText);
        document.getElementById(elementId).innerHTML = htmlContent;
    } catch (error) {
        console.error(`마크다운 파일 로딩 실패 (${fileName}):`, error);
    }
}

// 날짜 목록을 이용해 각 날짜의 블로그 포스트 컨테이너 생성 및 로드
function createBlogContainers() {
    const blogPostsContainer = document.getElementById('blog-posts');

    dates.forEach(date => {
        const container = document.createElement('div');
        container.className = 'container';
        container.id = date;

        const loadingText = document.createElement('h2');
        loadingText.textContent = '블로그 글 불러오는 중...';
        container.appendChild(loadingText);

        blogPostsContainer.appendChild(container);

        loadMarkdown(date, date);
    });
}

// 페이지 로드 시 블로그 컨테이너 생성 및 콘텐츠 로드 실행
createBlogContainers();
