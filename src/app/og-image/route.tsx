import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // URLパラメータから値を取得（デフォルト値も設定）
    const title = searchParams.get('title') || 'HAYABLOG';
    const subtitle = searchParams.get('subtitle') || 'AI × 英語学習サイト';
    const type = searchParams.get('type') || 'default';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
            position: 'relative',
          }}
        >
          {/* 背景パターン */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, #FCD34D 0%, transparent 50%), radial-gradient(circle at 75% 75%, #7C3AED 0%, transparent 50%)',
              opacity: 0.1,
            }}
          />
          
          {/* メインコンテンツ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
              padding: '40px',
            }}
          >
            {/* メインタイトル */}
            <h1
              style={{
                fontSize: title.length > 20 ? '48px' : '64px',
                fontWeight: 'black',
                color: '#FCD34D',
                marginBottom: '20px',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                maxWidth: '900px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>

            {/* サブタイトル */}
            <p
              style={{
                fontSize: '28px',
                color: '#E5E7EB',
                marginBottom: '40px',
                maxWidth: '800px',
                lineHeight: 1.3,
              }}
            >
              {subtitle}
            </p>

            {/* タグバッジ */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {type === 'blog' ? (
                // ブログ記事用のタグ
                <>
                  <span
                    style={{
                      backgroundColor: '#FCD34D',
                      color: '#000',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    📝 BLOG
                  </span>
                  <span
                    style={{
                      backgroundColor: '#7C3AED',
                      color: '#FFF',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    💻 TECH
                  </span>
                </>
              ) : type === 'about' ? (
                // プロフィール用のタグ
                <>
                  <span
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFF',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    👨‍💻 DEVELOPER
                  </span>
                  <span
                    style={{
                      backgroundColor: '#DC2626',
                      color: '#FFF',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    🇺🇸 USA
                  </span>
                </>
              ) : (
                // デフォルト用のタグ
                <>
                  <span
                    style={{
                      backgroundColor: '#FCD34D',
                      color: '#000',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    🤖 AI
                  </span>
                  <span
                    style={{
                      backgroundColor: '#7C3AED',
                      color: '#FFF',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    💻 TECH
                  </span>
                  <span
                    style={{
                      backgroundColor: '#2563EB',
                      color: '#FFF',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    🗣️ ENGLISH
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 右下のロゴ */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              right: '40px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6B7280',
              letterSpacing: '1px',
            }}
          >
            HAYABLOG.COM
          </div>

          {/* 装飾的な要素 */}
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '40px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FCD34D, #F59E0B)',
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '100px',
              right: '60px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #7C3AED, #5B21B6)',
              opacity: 0.6,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}