var works = [
  {
    id: 2, 
    mainImage: 'images/work2/main.jpg',
    title: '「anemoi」白渡小詠',
    subtitle: 'ラフ時点では可愛く描けたと思います  -  2025/12/25',
    hasTimelapse: true,
    timelapseVideo: 'videos/work2_timelapse.mp4',
    timelapseThumbnail: 'images/work2/timelapse_thumb.jpg',
    hasSketch: true,
    sketchImage: 'images/work2/sketch.jpg',
    roughProcess: [
      { image: 'images/work2/rough.jpg' },
      { image: 'images/work2/lineart.jpg' },
      { image: 'images/work2/final.jpg' }
    ],
    processTitle: '「TABELLARIUS」',
    processSubtitle: '制作過程を公開!'
  },
  {
    id: 1,
    mainImage: 'images/work1/main.jpg',
    title: '「さくら、もゆ。」クロのお誕生日記念イラスト',
    subtitle: '初のデジタルイラスト  -  2025/2/22',
    hasTimelapse: false,
    timelapseVideo: 'videos/work1_timelapse.mp4',
    timelapseThumbnail: 'images/work1/timelapse_thumb.jpg',
    hasSketch: true,
    sketchImage: 'images/work1/sketch.jpg',
    roughProcess: [
      { image: 'images/work1/rough.jpg' },
      { image: 'images/work1/lineart.jpg' },
      { image: 'images/work1/final.jpg' }
    ],
    processTitle: '「Caeruleum」',
    processSubtitle: '制作過程を公開!'
  }
];

function renderPortfolio() {
  var portfolioContent = document.getElementById('portfolio-content');
  if (!portfolioContent) return;

  var allContentHtml = '';

  works.forEach(function(work) {
    // --- 完成イラスト ---
    allContentHtml += `
      <div class="work-section">
        <div class="work-item-header completed-header">
          <h3 class="work-item-title">Completed Illustration</h3>
          <p class="work-item-subtitle">----— 完成イラスト —----</p>
        </div>
        <div class="work-display">
          <div class="work-image-wrapper">
            <img src="${work.mainImage}" alt="${work.title}" onclick="openLightbox(this.src)">
    `;

    if (work.hasTimelapse) {
      allContentHtml += `
        <div class="timelapse-badge">
          <img src="${work.timelapseThumbnail || work.mainImage}" alt="Time Lapse" onclick="openLightbox(this.src)">
          <div class="timelapse-label" onclick="event.stopPropagation(); openTimelapseVideo('${work.timelapseVideo}');">
            <span>Time Lapse</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      `;
    }
    
    if (work.hasSketch) {
      allContentHtml += `
        <div class="sketch-badge" onclick="openLightbox('${work.sketchImage}')">
          <img src="${work.sketchImage}" alt="Sketch">
          <div class="sketch-label">Sketch</div>
        </div>
      `;
    }

    allContentHtml += `
          </div>
          <div class="work-info completed-work-info">
            <h4 class="work-title">${work.title}</h4>
            <div class="title-partition"></div>
            <p class="work-subtitle">${work.subtitle}</p>
          </div>
        </div>
      </div>
    `;

    // --- ラフ・工程 ---
    allContentHtml += `
      <div class="work-section process-section">
        <div class="work-item-header">
          <h3 class="work-item-title">Rough & Process</h3>
          <p class="work-item-subtitle">----— ラフ・工程 —----</p>
        </div>
        <div class="work-display">
          <div class="process-images">
    `;

    work.roughProcess.forEach(function(proc) {
      allContentHtml += `
        <div class="process-image">
          <img src="${proc.image}" alt="Process image" onclick="openLightbox(this.src)">
        </div>
      `;
    });
    
    allContentHtml += `
            <div class="arrow"><div class="arrow-icon"></div></div>
            <div class="arrow"><div class="arrow-icon"></div></div>
          </div>
          <div class="work-info">
            <h4 class="work-title">${work.processTitle}</h4>
            <p class="work-subtitle">${work.processSubtitle}</p>
          </div>
        </div>
      </div>
    `;
  });

  portfolioContent.innerHTML = allContentHtml;
}

// --- Lightbox Functions ---
function openLightbox(src) {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
  }
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
  }
}

function openTimelapseVideo(videoUrl) {
  if (videoUrl) {
    window.open(videoUrl, '_blank');
  }
}

// ページの読み込みが完了したらポートフォリオを描画
document.addEventListener('DOMContentLoaded', function() {
  renderPortfolio();

  // Lightboxの閉じるイベントを設定
  var lightbox = document.getElementById('lightbox');
  var closeBtn = document.querySelector('.lightbox-close');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) { // 背景をクリックした時だけ閉じる
        closeLightbox();
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // --- Visitor Counter ---
  const countEl = document.getElementById('visitor-count');

  async function updateCounter() {
    try {
      // 注意: このURLはダミーです。実際のSupabaseのURLに置き換えてください。
      let response = await fetch('https://azbbbzzemhmyltrgwzdp.supabase.co/rest/v1/counts?select=views&name=eq.page_views', {
        method: 'GET',
        headers: {
          // 注意: このAPIキーはダミーです。実際のSupabaseのanonキーに置き換えてください。
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YmJienplbWhteWx0cmd3emRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODIxNDcsImV4cCI6MjA4Mjc1ODE0N30.u0u7YEwruWQofSenDqRm4OwMyQlRk_5OXMtu6c62gxs',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YmJienplbWhteWx0cmd3emRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODIxNDcsImV4cCI6MjA4Mjc1ODE0N30.u0u7YEwruWQofSenDqRm4OwMyQlRk_5OXMtu6c62gxs'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch count');
      }

      let data = await response.json();
      let currentViews = data[0].views;
      const newViews = currentViews + 1;

      // 画面に表示
      if(countEl) {
        countEl.textContent = newViews;
      }

      // カウントを更新
      await fetch('https://<project-id>.supabase.co/rest/v1/counts?name=eq.page_views', {
        method: 'PATCH',
        headers: {
          'apikey': '<your-anon-key>',
          'Authorization': 'Bearer <your-anon-key>',
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ views: newViews })
      });

    } catch (error) {
      console.error('Counter Error:', error);
      if(countEl) {
        // エラーが発生した場合は、カウンター部分を非表示にするか、メッセージを表示
        const counterContainer = document.getElementById('visitor-counter-container');
        if (counterContainer) {
          counterContainer.style.display = 'none'; // 非表示にする
          // または
          // countEl.textContent = '---'; // 代替テキスト
        }
      }
    }
  }

  updateCounter();
});
