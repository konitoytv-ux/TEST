# Sector Dashboard (Netlify Functions)

## Deploy via Netlify (Import from Git)
1. GitHub에 새 저장소 만들기 → 이 폴더의 모든 파일 업로드
2. Netlify → **Add new site → Import from Git** → 방금 만든 repo 선택
3. Build 설정
   - **Build command:** (비움)
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions` (자동 인식되지만 명시해도 됨)
4. Deploy → 완료 후 Functions 메뉴에서 `price`, `mentions` 확인

> Drag & Drop(수동 배포)은 Functions를 지원하지 않습니다.