import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json()
    
    // 秘密のキーで認証
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // 関連ページを再生成
    revalidatePath('/blog')     // ブログ一覧ページ
    revalidatePath('/')         // トップページ
    
    console.log('✅ Site revalidated successfully')
    
    return NextResponse.json({ 
      revalidated: true,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('❌ Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}