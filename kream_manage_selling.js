const kream_manage_selling_dates = ["2024-10-26"]

async function kreamManageSellingLoadMarkDown(kreamManageSellingFileName,kreamManageSellingElementId) {
    try {
        const response = await fetch(`/posts/kream_manage_selling/${kreamManageSellingFileName}.md`);
        if (!response.ok) {
            throw new Error(`Markdown 파일을 불러오는 중 오류 발생: ${kreamManageSellingFileName}`);
        }
        const markdownText = await response.text();
        const htmlContent = marked.parse(markdownText);
        document.getElementById(kreamManageSellingElementId).innerHTML = htmlContent;
    } catch (error) {
        console.error(`마크다운 파일 로딩 실패 (${fileName}):`, error);
    }
}

// 날짜 목록을 이용해 각 날짜의 블로그 포스트 컨테이너 생성 및 로드
function createKreamManageSellingContainers() {
    const blogPostsContainer = document.getElementById('kream_manage_selling-posts');

    kream_manage_selling_dates.forEach(date => {
        const container = document.createElement('div');
        container.className = 'container';
        container.id = date;

        const loadingText = document.createElement('h2');
        loadingText.textContent = '블로그 글 불러오는 중...';
        container.appendChild(loadingText);

        blogPostsContainer.appendChild(container);

        kreamManageSellingLoadMarkDown(date, date);
    });
}

createKreamManageSellingContainers();