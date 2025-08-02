import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // 強力な全キャッシュクリア
    revalidatePath('/', 'layout')      // ルートレイアウト
    revalidatePath('/blog', 'layout')  // ブログレイアウト
    revalidatePath('/', 'page')        // トップページ
    revalidatePath('/blog', 'page')    // ブログページ
    
    // タグベース無効化
    revalidateTag('posts')
    revalidateTag('blog')
    revalidateTag('sanity')
    
    console.log('✅ 全キャッシュ強制クリア完了')
    
    // キャッシュ制御ヘッダー追加
    const response = NextResponse.json({ 
      revalidated: true,
      timestamp: new Date().toISOString(),
      cleared: ['layout', 'pages', 'tags']
    })
    
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (err) {
    console.error('❌ Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}