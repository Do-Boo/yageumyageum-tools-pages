import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://tools.yageumyageum.app/';
const lastmod = '2026-06-23';
const outDir = path.resolve('public');

const toolPages = [
  {
    slug: 'image',
    toolId: 'img-tool',
    title: '이미지 도구 - 변환, 리사이즈, 자르기',
    metaDescription: 'JPG, PNG, WebP 이미지를 변환하고 크기를 줄이며 간단한 그리기와 자르기를 할 수 있는 무료 업무용 이미지 도구입니다.',
    h1: '이미지 변환, 리사이즈, 자르기 도구',
    intro: '업무 메신저, 보고서, 게시판에 올릴 이미지를 빠르게 정리할 때 쓰는 브라우저 기반 이미지 도구입니다. 파일을 선택하고 포맷과 크기를 고른 뒤 필요한 경우 간단히 표시하거나 잘라낼 수 있습니다.',
    features: ['JPG, PNG, WebP 포맷 변환', '비율 또는 픽셀 기준 이미지 크기 조절', '간단한 표시 그리기와 자르기', '여러 이미지 작업 후 ZIP 다운로드'],
    steps: ['이미지 파일을 선택하거나 드래그합니다.', '변환할 포맷과 크기 기준을 고릅니다.', '필요하면 썸네일을 눌러 표시하거나 자릅니다.', '변환 결과를 개별 다운로드하거나 ZIP으로 저장합니다.'],
    example: {
      title: '예시: 보고서 첨부 이미지 줄이기',
      body: '휴대폰으로 찍은 큰 PNG 이미지를 WebP로 바꾸고 50%로 줄이면 문서 첨부 용량을 낮추기 쉽습니다. 내부 공유용 캡처는 중요한 영역만 자른 뒤 표시를 남기면 전달력이 좋아집니다.',
    },
    faq: [
      ['이미지가 서버로 업로드되나요?', '브라우저 안에서 처리하는 도구입니다. 민감한 이미지는 회사 보안 정책을 확인한 뒤 사용하세요.'],
      ['WebP로 바꾸면 언제 유리한가요?', '웹 게시, 사내 위키, 메신저 공유처럼 용량이 중요한 상황에서 유리합니다. 인쇄용 원본은 별도로 보관하는 편이 좋습니다.'],
      ['여러 이미지를 한 번에 처리할 수 있나요?', '여러 파일을 선택한 뒤 같은 설정으로 변환하고 ZIP으로 내려받을 수 있습니다.'],
    ],
    related: ['pdf', 'text', 'qr'],
  },
  {
    slug: 'pdf',
    toolId: 'pdf-tool',
    title: 'PDF 도구 - 합치기, 분할, 압축',
    metaDescription: 'PDF 파일을 합치고, 페이지를 분할하고, 용량을 줄일 수 있는 직장인용 무료 PDF 업무 도구입니다.',
    h1: 'PDF 합치기, 분할, 압축 도구',
    intro: '메일 첨부나 전자결재에 맞게 PDF를 정리해야 할 때 쓰는 도구입니다. 여러 PDF를 하나로 묶거나 필요한 페이지만 분리하고, 공유하기 쉬운 크기로 정리할 수 있습니다.',
    features: ['여러 PDF 파일 합치기', '원하는 페이지 범위 분할', 'PDF 뷰어와 형광펜 표시', '공유 전 용량 압축'],
    steps: ['PDF 파일을 선택합니다.', '합치기, 분할, 압축 중 필요한 작업을 고릅니다.', '페이지 범위나 정렬 순서를 확인합니다.', '결과 파일을 내려받아 메일이나 업무 시스템에 첨부합니다.'],
    example: {
      title: '예시: 결재용 PDF 묶기',
      body: '견적서, 사업자등록증, 통장 사본 PDF를 하나로 합친 뒤 파일명을 정리하면 결재 상신과 메일 공유가 쉬워집니다. 필요한 페이지만 분리하면 외부 공유 시 불필요한 내부 페이지를 빼기 좋습니다.',
    },
    faq: [
      ['PDF 합치기 순서는 어떻게 정하나요?', '파일을 추가한 순서를 기준으로 묶습니다. 제출 전에 미리보기로 페이지 순서를 확인하세요.'],
      ['압축하면 품질이 떨어질 수 있나요?', '이미지가 많은 PDF는 용량을 줄이는 과정에서 품질이 낮아질 수 있습니다. 인쇄용 문서는 원본을 따로 보관하세요.'],
      ['비밀번호가 걸린 PDF도 처리되나요?', '보호된 PDF는 브라우저에서 읽지 못할 수 있습니다. 권한이 있는 파일만 사용하세요.'],
    ],
    related: ['image', 'text', 'email-reply'],
  },
  {
    slug: 'text',
    toolId: 'text-tool',
    title: '텍스트 정리 - 글자수 세기, 공백 제거',
    metaDescription: '글자수 세기, 공백 제거, 특수문자 정리, 중복 줄 제거를 한 번에 처리하는 무료 텍스트 업무 도구입니다.',
    h1: '글자수 세기와 텍스트 정리 도구',
    intro: '제안서, 메일, 채용 문항, 게시글처럼 글자 수 제한이 있거나 복사한 텍스트를 정리해야 할 때 빠르게 쓰는 도구입니다.',
    features: ['공백 포함/제외 글자 수 확인', '불필요한 공백과 줄바꿈 정리', '특수문자 제거', '중복 줄 제거와 대소문자 변환'],
    steps: ['정리할 텍스트를 붙여넣습니다.', '글자 수와 줄 수를 확인합니다.', '필요한 정리 버튼을 선택합니다.', '정리된 텍스트를 복사해 문서나 메일에 붙여넣습니다.'],
    example: {
      title: '예시: 지원 문항 글자수 맞추기',
      body: '공백 포함 500자 제한 문항은 먼저 글자 수를 확인하고, 중복 공백과 불필요한 줄바꿈을 정리하면 제한 안에 맞추기 쉽습니다.',
    },
    faq: [
      ['공백 제외 글자수도 볼 수 있나요?', '네. 공백 포함과 제외 기준을 함께 확인할 수 있습니다.'],
      ['붙여넣은 텍스트가 저장되나요?', '도구는 브라우저에서 동작합니다. 민감한 문구는 회사 보안 기준에 맞춰 사용하세요.'],
      ['특수문자 제거는 언제 쓰나요?', '엑셀, PDF, 웹페이지에서 복사한 텍스트에 섞인 기호나 깨진 문자를 정리할 때 유용합니다.'],
    ],
    related: ['email-reply', 'meeting-notes', 'link'],
  },
  {
    slug: 'qr',
    toolId: 'qr-tool',
    title: 'QR 코드 만들기 - 링크와 문구를 QR로 변환',
    metaDescription: 'URL이나 짧은 문구를 QR 코드로 만들고 색상과 크기를 지정해 저장할 수 있는 무료 QR 코드 생성 도구입니다.',
    h1: 'QR 코드 만들기 도구',
    intro: '행사 안내, 회의 자료, 사내 게시물에 붙일 QR 코드가 필요할 때 URL이나 문구를 입력해 바로 생성할 수 있습니다.',
    features: ['URL 또는 텍스트 기반 QR 생성', '색상과 크기 설정', 'PNG 이미지 저장', '회의 자료와 인쇄물에 바로 활용'],
    steps: ['QR로 만들 URL 또는 문구를 입력합니다.', '크기와 색상을 선택합니다.', '미리보기로 스캔 가능성을 확인합니다.', '이미지로 저장해 문서나 게시물에 삽입합니다.'],
    example: {
      title: '예시: 회의 자료 링크 공유',
      body: '슬라이드 마지막 장에 자료 폴더 QR을 넣으면 참석자가 긴 URL을 입력하지 않고 바로 접근할 수 있습니다.',
    },
    faq: [
      ['QR 코드는 얼마나 크게 만들어야 하나요?', '인쇄물은 사용 거리에 따라 다르지만 너무 작게 넣지 말고 여백을 충분히 두는 것이 좋습니다.'],
      ['색상을 바꿔도 인식되나요?', '대비가 낮으면 인식률이 떨어질 수 있습니다. 밝은 배경과 진한 QR 색상을 권장합니다.'],
      ['URL이 바뀌면 QR도 바뀌나요?', '일반 QR은 입력한 URL을 그대로 담습니다. URL이 바뀌면 새 QR을 만들어야 합니다.'],
    ],
    related: ['link', 'image', 'schedule'],
  },
  {
    slug: 'link',
    toolId: 'link-tool',
    title: 'URL 정리 - UTM 제거, 인코딩, 링크 정리',
    metaDescription: '긴 URL에서 UTM 파라미터를 제거하고 링크를 인코딩하거나 디코딩해 정리하는 무료 URL 업무 도구입니다.',
    h1: 'URL 정리와 UTM 제거 도구',
    intro: '메신저나 문서에 붙일 링크를 짧고 깔끔하게 만들 때 쓰는 도구입니다. 광고 추적 파라미터나 불필요한 쿼리를 제거하고 URL 인코딩 문제를 확인할 수 있습니다.',
    features: ['UTM 파라미터 제거', 'URL 인코딩과 디코딩', '긴 링크 정리', '문서 공유용 링크 복사'],
    steps: ['정리할 URL을 붙여넣습니다.', 'UTM 제거 또는 인코딩/디코딩 작업을 선택합니다.', '결과 URL을 확인합니다.', '정리된 링크를 복사해 문서나 메신저에 공유합니다.'],
    example: {
      title: '예시: 회의록 링크 정리',
      body: '뉴스레터에서 복사한 긴 링크는 UTM이 붙어 있을 때가 많습니다. 회의록에는 핵심 URL만 남기면 읽기 쉽고 링크 관리도 편해집니다.',
    },
    faq: [
      ['UTM을 제거해도 페이지가 열리나요?', '대부분의 경우 페이지 본문은 그대로 열립니다. 단, 일부 서비스는 쿼리 값에 기능을 담을 수 있으니 결과를 열어 확인하세요.'],
      ['인코딩은 언제 필요한가요?', '한글, 공백, 특수문자가 포함된 URL을 시스템에 붙여넣을 때 깨지는 경우 인코딩이 필요할 수 있습니다.'],
      ['단축 URL도 만들 수 있나요?', '현재 페이지는 URL 정리와 인코딩 중심입니다. 단축 URL은 외부 단축 서비스를 함께 사용해야 할 수 있습니다.'],
    ],
    related: ['qr', 'text', 'schedule'],
  },
  {
    slug: 'schedule',
    toolId: 'schedule-tool',
    title: '업무 일정 정리 - 오늘 할 일과 우선순위',
    metaDescription: '업무 일정과 오늘 할 일을 우선순위별로 정리하고 체크할 수 있는 직장인용 무료 일정 관리 도구입니다.',
    h1: '업무 일정과 오늘 할 일 정리 도구',
    intro: '하루 업무를 시작하기 전 할 일을 쪼개고 우선순위를 정리하는 도구입니다. 큰 업무를 바로 실행 가능한 단위로 나누는 데 초점을 맞췄습니다.',
    features: ['오늘 할 일 목록 작성', '우선순위 정리', '업무 메모 관리', '작은 실행 단위로 일정 분리'],
    steps: ['오늘 해야 할 일을 모두 적습니다.', '급한 일과 중요한 일을 나눕니다.', '작업 단위를 작게 쪼갭니다.', '완료한 항목을 확인하며 하루 업무를 정리합니다.'],
    example: {
      title: '예시: 오전 업무 정리',
      body: '보고서 초안 작성, 자료 요청, 회의 준비를 각각 30분 단위 작업으로 나누면 막연한 일정표보다 실행하기 쉽습니다.',
    },
    faq: [
      ['프로젝트 관리 도구를 대체하나요?', '장기 프로젝트 관리보다 오늘 해야 할 일을 빠르게 정리하는 용도에 가깝습니다.'],
      ['회의 일정도 넣을 수 있나요?', '짧은 메모 형태로 넣고 회의 준비 태스크를 함께 적어두면 좋습니다.'],
      ['우선순위는 어떻게 정하면 좋나요?', '마감이 임박했거나 다른 사람의 작업을 막는 일을 먼저 올려두는 방식이 실용적입니다.'],
    ],
    related: ['meeting-notes', 'email-reply', 'text'],
  },
  {
    slug: 'email-reply',
    toolId: 'email-reply',
    title: '메일 답장 생성기 - 업무 이메일 예시 작성',
    metaDescription: '상황을 입력하면 정중하고 프로페셔널한 업무 메일 답장 초안을 만들 수 있는 무료 AI 문서 도구입니다.',
    h1: '업무 메일 답장 생성기',
    intro: '거절, 일정 조율, 자료 요청, 확인 답장처럼 자주 쓰는 업무 이메일 초안을 빠르게 만들 수 있습니다. 생성된 문장은 그대로 보내기보다 상황과 회사 톤에 맞춰 확인하세요.',
    features: ['정중한 이메일 답장 초안 생성', '요청, 거절, 일정 조율 문구 구성', '친근한 톤과 격식 있는 톤 선택', '복사 후 메일 클라이언트에 붙여넣기'],
    steps: ['답장해야 하는 상황을 간단히 입력합니다.', '원하는 말투를 고릅니다.', '초안을 생성합니다.', '수신자, 일정, 금액, 첨부 파일 등 사실 정보를 확인하고 발송합니다.'],
    example: {
      title: '예시: 일정 조율 답장',
      body: '“이번 주 금요일 회의가 어려워 다음 주 월요일 오전으로 조정 요청”처럼 목적과 제약을 같이 적으면 더 자연스러운 초안이 나옵니다.',
    },
    faq: [
      ['생성된 메일을 바로 보내도 되나요?', '중요한 이름, 날짜, 첨부 파일, 약속 조건은 반드시 직접 확인한 뒤 보내세요.'],
      ['민감한 내용을 넣어도 되나요?', '개인정보, 계약 조건, 내부 기밀은 입력하지 않는 것이 안전합니다.'],
      ['짧은 답장도 만들 수 있나요?', '상황을 짧게 입력하면 확인, 감사, 일정 조율 같은 간단한 답장 초안을 만들 수 있습니다.'],
    ],
    related: ['text', 'meeting-notes', 'schedule'],
  },
  {
    slug: 'meeting-notes',
    toolId: 'meeting-notes',
    title: '회의록 생성기 - 요약과 액션 아이템 정리',
    metaDescription: '회의 메모를 요약하고 결정 사항과 액션 아이템을 정리하는 무료 회의록 생성 도구입니다.',
    h1: '회의록 생성기와 액션 아이템 정리',
    intro: '회의 중 적은 메모를 요약, 주요 결정 사항, 액션 아이템 형태로 정리하는 도구입니다. 회의 직후 후속 업무를 빠르게 공유할 때 유용합니다.',
    features: ['회의 내용 요약', '주요 결정 사항 분리', '담당자와 할 일 정리', '공유용 회의록 초안 생성'],
    steps: ['회의 중 적은 메모를 붙여넣습니다.', '누가 무엇을 언제까지 할지 포함합니다.', '회의록 초안을 생성합니다.', '참석자, 날짜, 결정 사항을 확인하고 공유합니다.'],
    example: {
      title: '예시: 주간 회의 정리',
      body: '논의 내용, 결정된 일정, 담당자를 한 문장씩 적어두면 회의록 생성 후 바로 팀 채널에 공유하기 좋습니다.',
    },
    faq: [
      ['녹음 파일을 바로 회의록으로 만들 수 있나요?', '현재는 텍스트 메모를 입력하는 방식입니다. 녹취록을 만든 뒤 붙여넣으면 정리할 수 있습니다.'],
      ['액션 아이템은 어떻게 정확히 나오나요?', '담당자, 마감일, 완료 기준을 메모에 명확히 적을수록 결과가 좋아집니다.'],
      ['회의록을 그대로 저장하나요?', '도구 사용 전 회사 보안 정책과 민감 정보 포함 여부를 확인하세요.'],
    ],
    related: ['schedule', 'email-reply', 'text'],
  },
];

const guides = [
  {
    slug: 'pdf-compress',
    title: 'PDF 용량 줄이는 법',
    metaDescription: '메일 첨부와 전자결재에 맞게 PDF 용량을 줄이는 실무 기준과 확인 순서를 정리했습니다.',
    h1: 'PDF 용량 줄이는 법',
    intro: 'PDF 용량이 커지는 가장 흔한 이유는 고해상도 이미지와 불필요한 페이지입니다. 제출 기준에 맞게 줄이되, 인쇄나 검토에 필요한 품질은 남겨야 합니다.',
    sections: [
      ['먼저 확인할 것', ['제출처의 최대 첨부 용량을 확인합니다.', '인쇄가 필요한 문서인지 화면 검토용인지 구분합니다.', '원본 PDF를 별도 보관한 뒤 압축본을 만듭니다.']],
      ['실무 순서', ['불필요한 페이지를 먼저 제거합니다.', '이미지가 많은 문서는 이미지 크기를 줄입니다.', '압축 후 표, 도장, 작은 글씨가 읽히는지 확인합니다.']],
    ],
    faq: [['무조건 가장 작게 압축하면 되나요?', '아닙니다. 작은 글씨, 도장, 표가 깨지면 업무상 문제가 생길 수 있어 용량과 품질의 균형이 필요합니다.']],
    relatedTools: ['pdf'],
  },
  {
    slug: 'pdf-merge',
    title: 'PDF 파일 합치는 법',
    metaDescription: '여러 PDF를 한 파일로 합칠 때 순서, 파일명, 제출 전 확인해야 할 체크리스트를 정리했습니다.',
    h1: 'PDF 파일 합치는 법',
    intro: '여러 첨부 파일을 하나로 묶으면 결재, 제출, 보관이 쉬워집니다. 다만 페이지 순서와 불필요한 정보 포함 여부를 먼저 확인해야 합니다.',
    sections: [
      ['합치기 전 준비', ['파일명을 제출 순서대로 정리합니다.', '외부 공유에 필요 없는 페이지를 제거합니다.', '비밀번호가 걸린 파일은 권한을 확인합니다.']],
      ['제출 전 체크', ['첫 페이지가 대표 문서인지 확인합니다.', '중복 페이지가 없는지 확인합니다.', '최종 파일명을 업무 맥락에 맞게 바꿉니다.']],
    ],
    faq: [['여러 종류의 문서를 하나로 묶어도 되나요?', '제출처가 허용한다면 가능합니다. 계약서, 견적서, 증빙 자료처럼 묶는 순서가 중요할 때 특히 유용합니다.']],
    relatedTools: ['pdf', 'text'],
  },
  {
    slug: 'image-webp',
    title: '이미지 WebP 변환하는 법',
    metaDescription: '업무용 이미지를 WebP로 바꿀 때 장점, 주의점, 변환 후 확인할 항목을 정리했습니다.',
    h1: '이미지 WebP 변환하는 법',
    intro: 'WebP는 웹 게시와 메신저 공유에서 용량을 줄이기 좋은 이미지 형식입니다. 단, 모든 업무 시스템이 WebP를 지원하는 것은 아니므로 제출처를 확인해야 합니다.',
    sections: [
      ['WebP가 유리한 상황', ['사내 위키나 게시판에 이미지를 올릴 때', '메신저로 많은 캡처 이미지를 공유할 때', '웹 페이지 로딩 속도를 줄이고 싶을 때']],
      ['주의할 점', ['인쇄용 원본은 JPG 또는 PNG로 보관합니다.', '구형 시스템 업로드가 필요한 경우 지원 형식을 확인합니다.', '변환 후 작은 글씨가 흐려지지 않았는지 봅니다.']],
    ],
    faq: [['PNG보다 항상 좋은가요?', '항상 그렇지는 않습니다. 투명 배경, 원본 보관, 인쇄 목적에 따라 PNG가 더 적합할 수 있습니다.']],
    relatedTools: ['image'],
  },
  {
    slug: 'text-count-cleanup',
    title: '글자수 세기와 공백 제거를 한 번에 하는 법',
    metaDescription: '자기소개서, 보고서, 메일 문구를 정리할 때 글자수와 공백을 함께 확인하는 방법을 정리했습니다.',
    h1: '글자수 세기와 공백 제거를 한 번에 하는 법',
    intro: '글자 수 제한이 있는 문서는 내용만큼 공백과 줄바꿈 관리가 중요합니다. 먼저 글자 수를 보고, 다음으로 불필요한 공백과 중복 줄을 정리하는 순서가 좋습니다.',
    sections: [
      ['추천 순서', ['초안을 그대로 붙여넣어 공백 포함 글자 수를 확인합니다.', '중복 공백과 줄바꿈을 정리합니다.', '정리 후 의미가 바뀌지 않았는지 다시 읽습니다.']],
      ['실무 활용', ['채용 문항 제한 확인', '게시글 글자 수 확인', '메일 제목과 미리보기 문구 정리']],
    ],
    faq: [['공백 포함과 제외 중 무엇을 봐야 하나요?', '제출처 기준을 따르세요. 기준이 없으면 공백 포함 글자 수를 먼저 보는 편이 안전합니다.']],
    relatedTools: ['text'],
  },
  {
    slug: 'remove-utm',
    title: 'URL에서 UTM 파라미터 제거하는 법',
    metaDescription: '긴 링크를 공유하기 전에 UTM 파라미터를 제거하고 핵심 URL만 남기는 방법을 정리했습니다.',
    h1: 'URL에서 UTM 파라미터 제거하는 법',
    intro: 'UTM 파라미터는 캠페인 분석에는 필요하지만 회의록이나 문서 공유에는 불필요한 경우가 많습니다. 핵심 URL만 남기면 문서가 깔끔해집니다.',
    sections: [
      ['제거해도 되는 흔한 항목', ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']],
      ['확인해야 할 항목', ['id, token, page, query처럼 실제 페이지 기능에 필요한 값은 지우면 안 됩니다.', '정리 후 링크를 한 번 열어 정상 이동을 확인합니다.']],
    ],
    faq: [['모든 물음표 뒤 내용을 지워도 되나요?', '아닙니다. 일부 서비스는 검색어, 문서 ID, 공유 권한을 쿼리에 담습니다. UTM처럼 추적 목적이 명확한 값만 제거하세요.']],
    relatedTools: ['link', 'qr'],
  },
  {
    slug: 'email-reply-examples',
    title: '업무 메일 답장 예시 모음',
    metaDescription: '일정 조율, 자료 요청, 거절, 확인 답장에 바로 참고할 수 있는 업무 메일 답장 예시를 정리했습니다.',
    h1: '업무 메일 답장 예시 모음',
    intro: '업무 메일은 목적이 분명하고 상대가 다음 행동을 알 수 있어야 합니다. 아래 예시는 초안으로 쓰고 사실 관계와 회사 톤에 맞게 다듬으세요.',
    sections: [
      ['일정 조율', ['“제안 주신 일정은 확인했습니다. 다만 해당 시간에는 선약이 있어 다음 주 월요일 오전 10시 또는 화요일 오후 2시로 조정 가능하실지 문의드립니다.”']],
      ['자료 요청', ['“검토를 위해 최신 견적서와 세부 사양서를 함께 전달 부탁드립니다. 확인 후 금요일까지 의견드리겠습니다.”']],
      ['부드러운 거절', ['“현재 일정상 이번 요청을 바로 진행하기는 어렵습니다. 우선순위를 조정할 수 있는 범위를 확인한 뒤 가능한 대안을 다시 말씀드리겠습니다.”']],
    ],
    faq: [['AI 답장을 그대로 보내도 되나요?', '중요한 날짜, 금액, 담당자, 첨부 파일은 반드시 직접 확인한 뒤 보내야 합니다.']],
    relatedTools: ['email-reply', 'text'],
  },
  {
    slug: 'meeting-notes-template',
    title: '회의록 자동 정리 템플릿',
    metaDescription: '회의 내용을 요약, 결정 사항, 액션 아이템으로 정리하는 실무형 회의록 템플릿을 제공합니다.',
    h1: '회의록 자동 정리 템플릿',
    intro: '회의록은 참석자가 회의 후 무엇을 해야 하는지 바로 알 수 있어야 합니다. 긴 문장보다 결정 사항과 액션 아이템을 분리하는 구조가 실무에 맞습니다.',
    sections: [
      ['기본 템플릿', ['회의명 / 일시 / 참석자', '논의 요약 3줄', '주요 결정 사항', '액션 아이템: 담당자, 마감일, 완료 기준']],
      ['메모할 때 팁', ['결론이 난 내용과 논의 중인 내용을 구분합니다.', '담당자 없는 할 일은 다시 확인합니다.', '마감일이 없는 요청은 공유 전에 보완합니다.']],
    ],
    faq: [['회의록에서 가장 중요한 항목은 무엇인가요?', '후속 행동입니다. 누가 무엇을 언제까지 할지 없으면 회의록의 실무 가치가 크게 떨어집니다.']],
    relatedTools: ['meeting-notes', 'schedule'],
  },
  {
    slug: 'qr-code-checklist',
    title: 'QR 코드 만들 때 주의할 점',
    metaDescription: 'QR 코드 생성 전 URL, 색상, 크기, 여백, 인쇄 확인까지 실무 체크리스트를 정리했습니다.',
    h1: 'QR 코드 만들 때 주의할 점',
    intro: 'QR은 만들기 쉽지만 인쇄 후 인식이 안 되면 다시 배포해야 합니다. 생성 전 URL과 디자인, 출력 크기를 함께 확인하세요.',
    sections: [
      ['체크리스트', ['URL이 최종 주소인지 확인합니다.', '배경과 QR 색상의 대비를 충분히 둡니다.', '코드 주변 여백을 남깁니다.', '실제 스마트폰으로 스캔 테스트를 합니다.']],
      ['업무 활용', ['행사 신청 링크', '회의 자료 폴더', '설문 조사', '사내 안내문']],
    ],
    faq: [['QR 색상을 브랜드 컬러로 바꿔도 되나요?', '가능하지만 대비가 낮으면 스캔률이 떨어집니다. 밝은 배경과 진한 전경색을 권장합니다.']],
    relatedTools: ['qr', 'link'],
  },
  {
    slug: 'office-automation-tools',
    title: '직장인 업무 자동화 도구 추천',
    metaDescription: '메일, 회의록, 일정, PDF, 이미지, 텍스트 정리를 빠르게 처리하는 직장인 업무 자동화 도구 구성을 정리했습니다.',
    h1: '직장인 업무 자동화 도구 추천',
    intro: '업무 자동화는 거대한 시스템보다 반복 작업을 줄이는 작은 도구에서 시작하는 편이 빠릅니다. 메일, 회의록, 파일 정리처럼 매일 반복되는 작업을 먼저 줄여보세요.',
    sections: [
      ['먼저 자동화하면 좋은 일', ['메일 답장 초안 작성', '회의록 요약과 액션 아이템 정리', 'PDF 합치기와 압축', '이미지 변환과 리사이즈', 'URL과 텍스트 정리']],
      ['도구 선택 기준', ['결과를 바로 복사하거나 다운로드할 수 있는지', '회사 보안 정책 안에서 쓸 수 있는지', '학습 없이 바로 쓸 수 있는지']],
    ],
    faq: [['업무 자동화가 꼭 AI여야 하나요?', '아닙니다. 파일명 변경, 공백 제거, PDF 합치기처럼 규칙 기반 도구도 큰 시간을 줄여줍니다.']],
    relatedTools: ['email-reply', 'meeting-notes', 'pdf', 'image'],
  },
  {
    slug: 'fake-work-tools',
    title: '일하는 척할 때 열어두기 좋은 업무 도구',
    metaDescription: '자리 비움, 화면 공유 전 정리, 업무 맥락 유지에 활용할 수 있는 화면용 업무 도구와 주의사항을 정리했습니다.',
    h1: '일하는 척할 때 열어두기 좋은 업무 도구',
    intro: '이 글은 업무 화면을 정리하거나 화면 공유 전 맥락을 유지하는 용도에 맞춘 안내입니다. 회사 규정과 팀 신뢰를 해치지 않는 범위에서 사용해야 합니다.',
    sections: [
      ['열어두기 좋은 화면', ['회의록 정리 화면', '일정과 할 일 목록', '문서 초안 정리 화면', '코드나 로그처럼 보이는 데모 화면']],
      ['주의할 점', ['업무 회피나 허위 보고 목적으로 쓰지 않습니다.', '화면 공유 전 민감 정보가 보이지 않는지 확인합니다.', '실제 해야 할 일 목록과 함께 쓰는 편이 안전합니다.']],
    ],
    faq: [['이 기능을 업무 회피용으로 써도 되나요?', '권장하지 않습니다. 화면 정리, 데모, 집중 모드처럼 정당한 용도 안에서 쓰는 것이 좋습니다.']],
    relatedTools: ['schedule', 'meeting-notes', 'text'],
  },
];

const trustPages = [
  {
    route: 'about/',
    title: '야금야금 소개',
    metaDescription: '야금야금 업무 도구와 야금야금 앱이 제공하는 급여 계산, 출석, 코인, 웹 유틸리티 기능을 소개합니다.',
    h1: '야금야금 소개',
    sections: [
      ['무엇을 만드는 곳인가요?', ['야금야금은 직장인의 근무 시간, 오늘 번 금액, 출석 기록, 작은 보상 흐름을 가볍게 보여주는 업무 보조 앱입니다.', '야금야금 업무 도구는 앱에서 바로 열 수 있는 웹 유틸리티 모음으로, PDF, 이미지, 텍스트, 메일, 회의록처럼 반복되는 작업을 빠르게 처리하도록 돕습니다.']],
      ['운영 원칙', ['업무 흐름을 방해하지 않는 작은 도구를 우선합니다.', '광고와 제휴 링크는 사용자가 알아볼 수 있게 표시합니다.', '민감한 업무 정보 입력은 사용자의 회사 보안 정책을 우선합니다.']],
    ],
  },
  {
    route: 'contact/',
    title: '문의',
    metaDescription: '야금야금 서비스, 개인정보, 계정 삭제, 광고 및 제휴 링크와 관련한 문의 방법을 안내합니다.',
    h1: '문의',
    sections: [
      ['문의 이메일', ['개인정보, 계정 삭제, 광고 고지, 교환 요청과 관련한 문의는 2fh82db250@gmail.com 으로 보낼 수 있습니다.']],
      ['문의할 때 포함하면 좋은 내용', ['사용 중인 앱 버전 또는 접속한 페이지', '문제가 발생한 시간과 재현 순서', '로그인 방식 또는 문의 목적. 비밀번호, 인증 코드, 민감한 업무 문서는 보내지 마세요.']],
    ],
  },
  {
    route: 'privacy/',
    title: '개인정보 처리방침',
    metaDescription: '야금야금이 처리하는 앱 설정, 로그인 정보, 출석 기록, 교환 요청, 광고 클릭 기록과 삭제 요청 안내입니다.',
    h1: '개인정보 처리방침',
    sections: [
      ['수집하는 정보', ['앱 설정: 급여 기준, 근무 시간, 근무 요일, 통화, 화면 투명도 등 사용자가 앱에서 설정한 값이며 기본적으로 기기 로컬에 저장됩니다.', '로그인 정보: Google 또는 Apple 로그인 시 제공되는 사용자 식별자, 이메일, 표시 이름입니다.', '서비스 이용 기록: 출석 날짜, 코인 적립/차감 내역, 교환 요청 상태, 광고 또는 업무 도구 클릭 기록, 앱 설치 식별자, 앱 버전, 플랫폼 정보입니다.']],
      ['이용 목적', ['급여 계산과 출석/코인 기능 제공', '커피 교환 요청 접수 및 운영 처리', '계정/데이터 삭제 요청 처리', '광고 링크 노출 및 클릭 기록 관리', '오류 대응, 악용 방지, 서비스 품질 개선']],
      ['계정 및 데이터 삭제', ['앱 안에서 설정 > 개인정보 / 광고 > 삭제 요청 경로로 삭제 요청을 시작할 수 있습니다.', '앱을 사용할 수 없는 경우 2fh82db250@gmail.com 으로 로그인 이메일, 로그인 방식, 요청 사유를 보내 요청할 수 있습니다.']],
    ],
  },
  {
    route: 'terms/',
    title: '이용약관',
    metaDescription: '야금야금 업무 도구의 이용 조건, 사용자 책임, 외부 링크, 서비스 변경 가능성을 안내합니다.',
    h1: '이용약관',
    sections: [
      ['서비스 이용', ['야금야금 업무 도구는 무료 웹 유틸리티와 문서 초안 도구를 제공합니다.', '사용자는 회사 보안 정책, 관련 법령, 제3자 권리를 침해하지 않는 범위에서 서비스를 이용해야 합니다.']],
      ['결과물 확인 책임', ['AI 문서 도구가 생성한 메일, 회의록, 문장은 초안입니다.', '날짜, 금액, 담당자, 계약 조건, 개인정보 등 중요한 사실은 사용자가 직접 검토해야 합니다.']],
      ['외부 링크와 광고', ['일부 페이지에는 Google AdSense 등 디스플레이 광고가 표시될 수 있습니다.', '외부 광고 페이지 이용에는 해당 사이트의 정책이 적용됩니다.']],
    ],
  },
  {
    route: 'affiliate-disclosure/',
    title: '광고 고지',
    metaDescription: '야금야금 업무 도구의 Google AdSense 광고 표시 방식과 리워드 미지급 원칙을 안내합니다.',
    h1: '광고 고지',
    sections: [
      ['광고 표시 안내', ['야금야금에는 Google AdSense 등 디스플레이 광고가 표시될 수 있습니다.', '광고 영역에는 “광고” 라벨을 표시하며, 실제 광고 내용은 광고 네트워크 정책에 따라 노출됩니다.']],
      ['리워드 미지급 원칙', ['광고를 보는 행위나 링크를 여는 행위만으로 사용자에게 앱 내 코인, 현금성 보상, 교환권을 지급하지 않습니다.']],
      ['운영 규칙', ['사용자가 광고를 누르면 외부 광고 페이지로 이동할 수 있습니다.', '광고 클릭 기록은 운영 통계와 악용 방지를 위해 기록될 수 있습니다.']],
    ],
  },
];

const toolBySlug = new Map(toolPages.map((tool) => [tool.slug, tool]));
const guideBySlug = new Map(guides.map((guide) => [guide.slug, guide]));

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function routeDepth(route) {
  return route.split('/').filter(Boolean).length;
}

function prefixFor(route) {
  return '../'.repeat(routeDepth(route));
}

function canonical(route) {
  return new URL(route, siteUrl).href;
}

function jsonLd(data) {
  return JSON.stringify(data, null, 2).replaceAll('</', '<\\/');
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function ordered(items) {
  return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>`;
}

function faqMarkup(faq) {
  return faq.map(([question, answer]) => `
    <details>
      <summary>${escapeHtml(question)}</summary>
      <p>${escapeHtml(answer)}</p>
    </details>
  `).join('');
}

function relatedToolLinks(slugs, prefix) {
  return slugs
    .map((slug) => toolBySlug.get(slug))
    .filter(Boolean)
    .map((tool) => `<a class="link-card" href="${prefix}tools/${tool.slug}/"><span>${escapeHtml(tool.h1)}</span><small>${escapeHtml(tool.metaDescription)}</small></a>`)
    .join('');
}

function pageLayout({ route, title, description, type = 'website', h1, intro, body, structuredData = [], adSlotName = null }) {
  const prefix = prefixFor(route);
  const url = canonical(route);
  const adSlot = adSlotName ? `\n    <aside class="ad-slot" data-ad-slot-name="${escapeHtml(adSlotName)}" aria-label="광고"></aside>` : '';
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | 야금야금 업무 도구</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#FFD600">
  <link rel="canonical" href="${url}">
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}assets/seo.css">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="야금야금 업무 도구">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${new URL('og-image.svg', siteUrl).href}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${new URL('og-image.svg', siteUrl).href}">
  ${structuredData.map((data) => `<script type="application/ld+json">${jsonLd(data)}</script>`).join('\n  ')}
  <script defer src="${prefix}assets/ads.js" data-config="${prefix}ads-config.json"></script>
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${prefix}">야금야금 업무 도구</a>
    <nav aria-label="주요 링크">
      <a href="${prefix}tools/pdf/">PDF</a>
      <a href="${prefix}tools/image/">이미지</a>
      <a href="${prefix}guides/">가이드</a>
      <a href="${prefix}about/">소개</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <p class="kicker">야금야금 업무 도구</p>
      <h1>${escapeHtml(h1)}</h1>
      <p>${escapeHtml(intro)}</p>
    </section>${adSlot}
    ${body}
  </main>
  <footer class="site-footer">
    <a href="${prefix}privacy/">개인정보 처리방침</a>
    <a href="${prefix}terms/">이용약관</a>
    <a href="${prefix}contact/">문의</a>
    <a href="${prefix}affiliate-disclosure/">광고 고지</a>
  </footer>
</body>
</html>
`;
}

function breadcrumb(route, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: siteUrl },
      { '@type': 'ListItem', position: 2, name, item: canonical(route) },
    ],
  };
}

function faqData(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

function toolPage(tool) {
  const route = `tools/${tool.slug}/`;
  const prefix = prefixFor(route);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.h1,
      url: canonical(route),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'ko-KR',
      description: tool.metaDescription,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      publisher: { '@type': 'Organization', name: '야금야금' },
    },
    breadcrumb(route, tool.h1),
    faqData(tool.faq),
  ];
  const body = `
    <section class="action-row">
      <a class="primary-action" href="${prefix}?tool=${encodeURIComponent(tool.toolId)}">도구 바로 열기</a>
      <a class="secondary-action" href="${prefix}guides/">업무 가이드 보기</a>
    </section>
    <section class="two-column">
      <article class="content-card">
        <h2>무엇을 할 수 있나요</h2>
        ${list(tool.features)}
      </article>
      <article class="content-card">
        <h2>사용 방법</h2>
        ${ordered(tool.steps)}
      </article>
    </section>
    <section class="content-card">
      <h2>${escapeHtml(tool.example.title)}</h2>
      <p>${escapeHtml(tool.example.body)}</p>
    </section>
    <section class="content-card">
      <h2>자주 묻는 질문</h2>
      <div class="faq-list">${faqMarkup(tool.faq)}</div>
    </section>
    <section>
      <h2 class="section-title">관련 도구</h2>
      <div class="link-grid">${relatedToolLinks(tool.related, prefix)}</div>
    </section>
  `;
  return { route, html: pageLayout({ route, title: tool.title, description: tool.metaDescription, h1: tool.h1, intro: tool.intro, body, structuredData, adSlotName: 'toolTop' }) };
}

function guidePage(guide) {
  const route = `guides/${guide.slug}/`;
  const prefix = prefixFor(route);
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.metaDescription,
      inLanguage: 'ko-KR',
      datePublished: lastmod,
      dateModified: lastmod,
      author: { '@type': 'Organization', name: '야금야금' },
      publisher: { '@type': 'Organization', name: '야금야금' },
      mainEntityOfPage: canonical(route),
    },
    breadcrumb(route, guide.h1),
    faqData(guide.faq),
  ];
  const body = `
    ${guide.sections.map(([heading, items]) => `
      <section class="content-card">
        <h2>${escapeHtml(heading)}</h2>
        ${list(items)}
      </section>
    `).join('')}
    <section class="content-card">
      <h2>자주 묻는 질문</h2>
      <div class="faq-list">${faqMarkup(guide.faq)}</div>
    </section>
    <section>
      <h2 class="section-title">바로 쓸 수 있는 관련 도구</h2>
      <div class="link-grid">${relatedToolLinks(guide.relatedTools, prefix)}</div>
    </section>
  `;
  return { route, html: pageLayout({ route, title: guide.title, description: guide.metaDescription, type: 'article', h1: guide.h1, intro: guide.intro, body, structuredData, adSlotName: 'articleInline' }) };
}

function guidesIndex() {
  const route = 'guides/';
  const prefix = prefixFor(route);
  const body = `
    <section class="link-grid">
      ${guides.map((guide) => `<a class="link-card" href="${prefix}guides/${guide.slug}/"><span>${escapeHtml(guide.h1)}</span><small>${escapeHtml(guide.metaDescription)}</small></a>`).join('')}
    </section>
    <section class="content-card">
      <h2>도구부터 바로 쓰고 싶다면</h2>
      <p>가이드를 읽기 전에 바로 작업해야 한다면 PDF, 이미지, 텍스트, QR, URL, 메일, 회의록 도구를 먼저 열어도 됩니다.</p>
      <div class="inline-links">${toolPages.map((tool) => `<a href="${prefix}tools/${tool.slug}/">${escapeHtml(tool.h1)}</a>`).join('')}</div>
    </section>
  `;
  return {
    route,
    html: pageLayout({
      route,
      title: '업무 도구 가이드 모음',
      description: 'PDF, 이미지, 텍스트, QR, URL, 메일, 회의록 업무를 빠르게 처리하는 실무 가이드 모음입니다.',
      h1: '업무 도구 가이드 모음',
      intro: '반복되는 업무를 빠르게 처리할 수 있도록 도구 사용법과 실무 체크리스트를 정리했습니다.',
      body,
      structuredData: [breadcrumb(route, '업무 도구 가이드 모음')],
      adSlotName: 'articleBottom',
    }),
  };
}

function trustPage(page) {
  const route = page.route;
  const body = page.sections.map(([heading, paragraphs]) => `
    <section class="content-card">
      <h2>${escapeHtml(heading)}</h2>
      ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    </section>
  `).join('');
  return {
    route,
    html: pageLayout({
      route,
      title: page.title,
      description: page.metaDescription,
      h1: page.h1,
      intro: page.metaDescription,
      body,
      structuredData: [breadcrumb(route, page.h1)],
    }),
  };
}

function sitemap(pages) {
  const entries = [''].concat(pages.map((page) => page.route));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((route) => `  <url>
    <loc>${canonical(route)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('tools/') ? '0.9' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

const seoCss = `:root {
  --ink: #191f28;
  --muted: #6b7684;
  --bg: #f2f4f6;
  --surface: #ffffff;
  --yellow: #ffd158;
  --blue: #3182f6;
  --border: 2.5px solid var(--ink);
  --shadow: 4px 4px 0 var(--ink);
}

* { box-sizing: border-box; }
html { font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif; color: var(--ink); background: var(--bg); }
body { margin: 0; background: var(--bg); }
a { color: inherit; text-decoration: none; }
p { color: var(--muted); font-weight: 700; line-height: 1.7; }
ul, ol { margin: 0; padding-left: 1.25rem; color: var(--muted); font-weight: 800; line-height: 1.8; }
li + li { margin-top: 0.35rem; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  padding: 0 24px;
  border-bottom: 4px solid var(--ink);
  background: var(--yellow);
}
.brand, .site-header nav a { font-weight: 900; }
.site-header nav { display: flex; flex-wrap: wrap; gap: 16px; }

main {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
  padding: 56px 0 72px;
}
.hero {
  max-width: 840px;
  margin-bottom: 32px;
}
.kicker {
  display: inline-block;
  margin: 0 0 12px;
  padding: 5px 10px;
  border: 2px solid var(--ink);
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 12px;
}
h1 {
  margin: 0 0 16px;
  font-size: clamp(28px, 5vw, 56px);
  line-height: 1.08;
  letter-spacing: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
}
h2 {
  margin: 0 0 14px;
  font-size: 22px;
  line-height: 1.25;
  word-break: keep-all;
  overflow-wrap: break-word;
}
.section-title {
  margin: 36px 0 16px;
}
.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 28px;
}
.ad-slot {
  margin-bottom: 28px;
}
.primary-action, .secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 18px;
  border: var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
  font-weight: 900;
}
.primary-action { background: var(--blue); color: white; }
.secondary-action { background: var(--surface); }
.two-column, .link-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.content-card, .link-card {
  display: block;
  padding: 22px;
  border: var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
  background: var(--surface);
}
.content-card + .content-card,
.two-column + .content-card,
.content-card + section,
.link-grid + .content-card {
  margin-top: 22px;
}
.link-card span {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 900;
}
.link-card small {
  display: block;
  color: var(--muted);
  font-size: 13px;
  font-weight: 800;
  line-height: 1.5;
}
.faq-list {
  display: grid;
  gap: 10px;
}
details {
  padding: 14px 0;
  border-top: 2px solid #e5e8eb;
}
details:first-child { border-top: 0; }
summary {
  cursor: pointer;
  font-weight: 900;
}
.inline-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}
.inline-links a {
  padding: 8px 10px;
  border: 2px solid var(--ink);
  border-radius: 10px;
  background: var(--yellow);
  font-size: 13px;
  font-weight: 900;
}
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  padding: 28px 20px 40px;
  border-top: 3px solid var(--ink);
  font-size: 13px;
  font-weight: 900;
}

@media (max-width: 760px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px 20px;
  }
  main {
    width: calc(100% - 32px);
    padding-top: 36px;
  }
  .two-column, .link-grid {
    grid-template-columns: 1fr;
  }
  .content-card, .link-card {
    padding: 18px;
    border-radius: 18px;
  }
}
`;

async function writePage(page) {
  const targetDir = path.join(outDir, page.route);
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.html'), page.html);
}

async function main() {
  const pages = [
    ...toolPages.map(toolPage),
    guidesIndex(),
    ...guides.map(guidePage),
    ...trustPages.map(trustPage),
  ];

  await rm(path.join(outDir, 'tools'), { recursive: true, force: true });
  await rm(path.join(outDir, 'guides'), { recursive: true, force: true });
  for (const trust of trustPages) {
    await rm(path.join(outDir, trust.route), { recursive: true, force: true });
  }

  await mkdir(path.join(outDir, 'assets'), { recursive: true });
  await writeFile(path.join(outDir, 'assets', 'seo.css'), seoCss);
  await Promise.all(pages.map(writePage));
  await writeFile(path.join(outDir, 'sitemap.xml'), sitemap(pages));
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', siteUrl).href}
`);
  await writeFile(path.join(outDir, 'ads.txt'), `# Google AdSense 승인 후 실제 publisher ID로 아래 예시를 교체하세요.
# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
