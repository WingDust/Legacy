
#include <libavformat/avformat.h>
#include <libavcodec/avcodec.h>
#include <libavutil/avutil.h>


//#region
int extract(const char *p,frameData *f){

    // 鍒濆鍖栬棰戞牸寮忎笂涓嬫枃鐨勭┖鎸囬拡
    
    AVFormatContext *fmt_ctx = NULL;
    // 鍒濆鍖栦竴涓瓨鏀捐棰戝抚鐨勭┖鎸囬拡
    AVFrame *frame =  NULL;

    /**
     * 1.  avformat_open_input 鎵撳紑瑙嗛鏂囦欢鏍煎紡涓婁笅鏂囧苟鍒涘缓娴�
     * 2.  avformat_find_stream_info 浠庢祦涓鍙栧埌娴佺殑淇℃伅锛屽瑙嗛甯х殑鏍煎紡...锛岃繖浜涗俊鎭細鎸傝浇鍦ㄨ棰戞牸寮忎笂涓嬫枃涓�
     * 3.  av_find_best_stream 浠庢祦涓壘鍒拌棰戞祦鍦ㄦ祦涓殑绱㈠紩,骞剁紦瀛樼潃
     * 4.  浠庤棰戞牸寮忎笂涓嬫枃涓幏鍙栬В鐮佸櫒閰嶇疆鍙傛暟涓庤В鐮佸櫒鐨処D
     * 5.  浣跨敤 avcodec_find_decoder 涓庤В鐮佸櫒鐨処D 鏉ヨ幏鍙栬В鐮佸櫒
     * 6.  鍒涘缓瑙ｇ爜鍣ㄧ殑涓婁笅鏂囷紝涓哄叾鍒嗛厤鍒濆鍖栫殑鍐呭瓨
     * 7.  鍐嶅皢瑙嗛娴佷腑鐨勫弬鏁板姞杞藉埌 AVCodecContext涓�
     * 8.  鎵撳紑瑙ｇ爜鍣�
     * 9.  鍒嗛厤涓€涓師濮嬭鍙栧埌甯у唴瀛樹笌涓€涓細琚浆鎴怸UV鏍煎紡甯х殑甯у唴瀛�
     * 10. 鍒嗛厤Packet锛圥acket 鏄祦鏁版嵁涓竴灏忓潡锛夊唴瀛�
     * 11. 鍒濆鍖栬浆鍖栨牸寮忕殑涓婁笅鏂囩粨鏋勪綋
     * 12.  av_image_get_buffer_size 閫氳繃鎸囧畾鍍忕礌鏍煎紡銆佸浘鍍忓銆佸浘鍍忛珮鏉ヨ绠楁墍闇€鍐呭瓨澶у皬
     * 13. av_malloc 鍒嗛厤鍐呭瓨锛宎v_image_fill_arrays 灏嗗垎閰嶅唴瀛樺～鍏�
     * 14. 
     *      av_read_frame
     *          |
     *          |
     *          v
     *      avcodec_send_packet
     *          |
     *          |
     *          v
     *      avcodec_receive_frame
     *          |
     *          |
     *          v
     *      sws_scale
     *      
     *      av_read_frame 浠庢祦涓鍙栦竴甯э紝娉ㄦ剰杩欎竴甯у彲鑳芥槸瑙嗛甯с€侀煶棰戝抚鈥︹€�
     *      avcodec_send_packet 灏嗕粠娴佷腑璇诲彇鍑烘潵鐨� Packet 鏍煎紡鏁版嵁锛堝瓨鏀剧潃甯ф暟鎹級閫佺粰瑙ｇ爜鍣ㄨВ鐮�
     *      avcode_receive_frame 浠庤В鐮佺殑鏁版嵁涓幏鍙栧抚锛屼細鍒ゆ柇鏄惁鑾峰彇鎴愬姛
     *      sws_scale 灏嗗抚鐨勫儚绱犳牸寮忚繘琛岃浆鎴愰渶瑕佺殑鏍煎紡锛堟垜杞垚鐨勬槸YUV锛夛紝鑾峰彇鍒扮殑甯т笉鏄竴閮芥槸 YUV 鏍煎紡
     * 
     */

    //#region 1.
    if (avformat_open_input(&fmt_ctx,p,NULL,NULL) < 0/* condition */){
        // 鎵撳紑澶辫触杩斿洖 1
        return 1;
    }
    //#endregion

    //#region 2.
	if (avformat_find_stream_info(fmt_ctx, NULL) < 0) {
        // 涓嶈兘鎵惧埌娴佷俊鎭繑鍥� 2
		return 2;
    }
    //#endregion

    // 鐢ㄤ簬鍚庣户鍑芥暟鎴愬姛鐨勮繑鍥炲€煎垽鏂紝浼氳澶氫釜鍑芥暟杩斿洖璧嬪€�
    int ret;

    // 3.
    int  video_stream_idx = av_find_best_stream(fmt_ctx, AVMEDIA_TYPE_VIDEO, -1, -1,NULL,0);

    // 4.
    AVCodecParameters * avcodecParameters = fmt_ctx->streams[video_stream_idx]->codecpar;
    enum AVCodecID codecId = avcodecParameters->codec_id;

    // 5.
    AVCodec * codec = avcodec_find_decoder(codecId);

    // 6.
    AVCodecContext *dec_ctx = avcodec_alloc_context3(NULL);
    if (!dec_ctx) {
        // 鍒嗛厤瑙ｇ爜鍣ㄥ唴瀛樺け璐ヨ繑鍥� 6
        return 6;
    }
    // 7 
    ret = avcodec_parameters_to_context(dec_ctx,avcodecParameters);
    if (ret < 0) {
        // 鍒嗛厤瑙ｇ爜鍣ㄥ唴瀛樺け璐ヨ繑鍥� 7
        return 7;
    }
 
    // 8.
    ret = avcodec_open2(dec_ctx,codec,0);
    if (ret < 0) {
        // 鎵撳紑瑙ｇ爜鍣ㄥけ璐ヨ繑鍥� 8
        return 8;
    }
    // 9.
    frame = av_frame_alloc();
    if (!frame) {
        // 鍒嗛厤甯у唴瀛樺け璐ヨ繑鍥�
        return 9;
    }
    // 10.
    AVPacket *pkt = av_packet_alloc();
    if (!pkt) {
        return 10;
    }

    // 璁板綍璇诲彇鐨勫抚鏁�
    int currentIdx=0;

    // 14.
    // printf("av_read_frame\n");
    std::cout << "av_read_frame" << "\n";
    while (av_read_frame(fmt_ctx,pkt)>=0)
    {
        if (pkt->stream_index == video_stream_idx){
        // 
        // printf("avcodec_send_packet\n");
        std::cout << "avcodec_send_packet" << "\n";
        avcodec_send_packet(dec_ctx,pkt);

        // 
        // printf("avcodec_receive_frame\n");
        std::cout << "avcodec_receive_frame" << "\n";
        ret = avcodec_receive_frame(dec_ctx,frame);
            if (ret==0){
                currentIdx++;

                if (currentIdx==1)
                {
                    // std::cout << dec_ctx->width << "\n";
                    for (size_t i = 0; i < 3; i++)
                    {
                        f->data[i]=frame ->data[i];
                    }
                    // printf("%d",dec_ctx->width);
                    // printf("pass height: %d\n",f->height);
                    // printf("pass width: %d\n",f.height);
                    // printf("height: %d\n",dec_ctx->height);
                    f->height=dec_ctx->height;
                    f->width=dec_ctx->width;
                    // std::cout << strlen(frame->data[0]) << "\n";
                    // std::cout << frame->data[1] << "\n";
                    // std::cout << frame->data[2] << "\n";
                    std::cout << f->width << "\n";
                    std::cout << f->height << "\n";
                    std::cout << frame->linesize[0] << "\n";
                    std::cout << frame->linesize[1] << "\n";
                    std::cout << frame->linesize[2] << "\n";
                    // printf("break\n");
                    break;
                }
            }
        }
    }
    
    // printf("av_packet_free\n");
    av_packet_free(&pkt);
    // printf("avcodec_close\n");
    // av_frame_free(&frame);
    avcodec_close(dec_ctx);
    // printf("avformat_free_context\n");
    avformat_free_context(fmt_ctx);

    return 99;
}

//#endregion 