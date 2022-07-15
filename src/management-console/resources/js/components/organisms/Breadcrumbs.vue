<template>
    <ol class="sk-breadcrumbs">
        <li v-for="(item, index) in state.breadcrumbs" :key="item.name">
            <span
                v-if="index === state.breadcrumbs.length - 1"
                class="current-label"
                >{{ item.label }}</span
            >
            <router-link v-else :to="item.to">{{ item.label }}</router-link>

            <span class="arrow" v-if="index < state.breadcrumbs.length - 1"
                >></span
            >
        </li>
    </ol>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
    props: {
        headerColor: {
            type: String,
            default: 'primary',
        },
    },
    components: {},
    setup(props, context) {
        const breadcrumbMetas = [
            {
                label: 'ダッシュボード',
                name: 'dashboard',
                breadcrumbs: [],
            },

            // オーナー管理
            {
                label: 'オーナー一覧',
                name: 'owner.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '法人オーナー一覧',
                name: 'owner.index.corporate',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '新規作成',
                name: 'owner.create.basic',
                breadcrumbs: ['dashboard', 'owner.index'],
            },
            {
                label: '基本情報',
                name: 'owner.show.basic',
                breadcrumbs: ['dashboard', 'owner.index'],
                paramKey: 'id',
            },
            {
                label: '勤務先一覧',
                name: 'owner.show.work.index',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '勤務先 新規作成',
                name: 'owner.show.work.create',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.work.index',
                ],
            },
            {
                label: '勤務先情報',
                name: 'owner.show.work.show',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.work.index',
                ],
                paramKey: 'workSpaceId',
            },
            {
                label: '契約一覧',
                name: 'owner.show.purchase.index',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '売買契約 新規作成',
                name: 'owner.show.purchase.create.basic',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.purchase.index',
                ],
            },
            {
                label: '売買契約情報',
                name: 'owner.show.purchase.show.basic',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.purchase.index',
                ],
                paramKey: 'purchaseContractId',
            },
            {
                label: '売買契約書類 一覧',
                name: 'owner.show.purchase.attachment.index',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.purchase.index',
                    'owner.show.purchase.show.basic',
                ],
            },
            {
                label: '売買契約書類 新規作成',
                name: 'owner.show.purchase.attachment.create',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.purchase.index',
                    'owner.show.purchase.show.basic',
                    'owner.show.purchase.attachment.index',
                ],
            },
            {
                label: '売買契約書類 詳細',
                name: 'owner.show.purchase.attachment.show',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.purchase.index',
                    'owner.show.purchase.show.basic',
                    'owner.show.purchase.attachment.index',
                ],
                paramKey: 'purchaseContractId',
            },
            {
                label: '送金データ一覧',
                name: 'owner.show.transfer.index',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '書類一覧',
                name: 'owner.show.attachment.index',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '書類 新規作成',
                name: 'owner.show.attachment.create',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.attachment.index',
                ],
            },
            {
                label: '書類詳細',
                name: 'owner.show.attachment.show',
                breadcrumbs: [
                    'dashboard',
                    'owner.index',
                    'owner.show.basic',
                    'owner.show.attachment.index',
                ],
                paramKey: 'attachmentId',
            },
            {
                label: '総会参加履歴',
                name: 'owner.show.attendance-history.general-meeting',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '説明会参加履歴',
                name: 'owner.show.attendance-history.info-session',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },
            {
                label: '動画説明会参加履歴',
                name: 'owner.show.attendance-history.video-info-session',
                breadcrumbs: ['dashboard', 'owner.index', 'owner.show.basic'],
            },

            // 契約管理
            {
                label: '契約管理',
                name: 'contract',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '契約申込み一覧',
                name: 'contract.index',
                breadcrumbs: ['dashboard', 'contract'],
            },
            {
                label: '契約状況',
                name: 'contract.status',
                breadcrumbs: ['dashboard', 'contract'],
            },
            {
                label: '契約書の送付',
                name: 'contract.send',
                breadcrumbs: ['dashboard', 'contract'],
            },
            {
                label: '基本情報',
                name: 'contract.show.basic',
                breadcrumbs: ['dashboard', 'contract'],
                paramKey: 'id',
            },
            {
                label: '編集',
                name: 'contract.show.basic.edit',
                breadcrumbs: ['dashboard', 'contract', 'contract.show.basic'],
            },
            {
                label: '口座情報',
                name: 'contract.show.bank-account',
                breadcrumbs: ['dashboard', 'contract'],
                paramKey: 'id',
            },
            {
                label: '本人確認書類',
                name: 'contract.show.license-image',
                breadcrumbs: ['dashboard', 'contract'],
                paramKey: 'id',
            },

            // お問い合わせ管理
            {
                label: 'お問い合わせ一覧',
                name: 'inquiry.beautician.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: 'お問い合わせ',
                name: 'inquiry.beautician.show',
                breadcrumbs: ['dashboard', 'inquiry.beautician.index'],
                paramKey: 'id',
            },

            // チャット管理
            {
                label: 'チャット一覧',
                name: 'chat.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: 'チャット新規作成',
                name: 'chat.create',
                breadcrumbs: ['dashboard', 'chat.index'],
            },
            {
                label: 'チャット',
                name: 'chat.show',
                breadcrumbs: ['dashboard', 'chat.index'],
                paramKey: 'id',
            },

            // オーナーお知らせ管理
            {
                label: 'お知らせ一覧',
                name: 'notice.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: 'お知らせ新規作成',
                name: 'notice.create',
                breadcrumbs: ['dashboard', 'notice.index'],
            },
            {
                label: 'お知らせ',
                name: 'notice.show',
                breadcrumbs: ['dashboard', 'notice.index'],
                paramKey: 'id',
            },
            {
                label: 'オーナーへの総会通知',
                name: 'notice.owner.generalMeeting.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: 'オーナーへの総会通知新規登録',
                name: 'notice.owner.generalMeeting.create',
                breadcrumbs: ['dashboard', 'notice.owner.generalMeeting.index'],
            },
            {
                label: 'オーナーへの総会通知情報',
                name: 'notice.owner.generalMeeting.show',
                breadcrumbs: ['dashboard', 'notice.owner.generalMeeting.index'],
                paramKey: 'meetingId',
            },
            {
                label: '総会通知の再送',
                name: 'notice.owner.generalMeeting.resend',
                breadcrumbs: ['dashboard', 'notice.owner.generalMeeting.index'],
                paramKey: 'meetingId',
            },
            // 説明会
            {
                label: '説明会のご案内',
                name: 'notice.owner.infoSession.plain.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '説明会のご案内 動画説明会',
                name: 'notice.owner.infoSession.video.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '説明会のご案内 新規登録',
                name: 'notice.owner.infoSession.create',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                ],
            },
            {
                label: '説明会のご案内 詳細',
                name: 'notice.owner.infoSession.show',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                ],
                paramKey: 'id',
            },
            {
                label: '説明会のご案内 再送',
                name: 'notice.owner.infoSession.resend',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                ],
                paramKey: 'id',
            },
            {
                label: '動画説明会 新規登録',
                name: 'notice.owner.videoInfoSession.create',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.video.index',
                ],
            },

            // 変更リクエスト管理（オーナー）
            {
                label: 'オーナー変更リクエスト一覧',
                name: 'update-request.owner.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: 'オーナー変更リクエスト情報',
                name: 'update-request.owner.show',
                breadcrumbs: ['dashboard', 'update-request.owner.index'],
                paramKey: 'id',
            },

            // 転居希望管理
            {
                label: '転居希望一覧',
                name: 'apartment-hunting.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '転居希望詳細',
                name: 'apartment-hunting.show',
                breadcrumbs: ['dashboard', 'apartment-hunting.index'],
                paramKey: 'id',
            },

            // 退去依頼管理
            {
                label: '退去依頼一覧',
                name: 'cancellation-request.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '退去依頼詳細',
                name: 'cancellation-request.show',
                breadcrumbs: ['dashboard', 'cancellation-request.index'],
                paramKey: 'id',
            },

            // 説明会参加者管理
            {
                label: '説明会参加者一覧',
                name: 'orientations.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '説明会参加者詳細',
                name: 'orientations.show',
                breadcrumbs: ['dashboard', 'orientations.index'],
                paramKey: 'id',
            },

            // シェアサロン管理
            {
                label: '店舗一覧',
                name: 'salon.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '店舗追加',
                name: 'salon.create',
                breadcrumbs: ['dashboard', 'salon.index'],
            },
            {
                label: '店舗情報',
                name: 'salon.show',
                paramKey: 'id',
                breadcrumbs: ['dashboard', 'salon.index'],
            },
            {
                label: '契約者一覧',
                name: 'salon.show.contractors',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '店舗詳細',
                name: 'salon.show.basic',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '店舗詳細編集',
                name: 'salon.show.basic.edit',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'ルーム',
                name: 'salon.show.room',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'ルーム詳細',
                name: 'salon.show.room.detail',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'ルーム編集',
                name: 'salon.show.room.edit',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'ルーム追加',
                name: 'salon.show.room.create',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'シェア＆ブース',
                name: 'salon.show.shareAndBooth',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'シェア＆ブース詳細',
                name: 'salon.show.shareAndBooth.detail',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'シェア＆ブース編集',
                name: 'salon.show.shareAndBooth.edit',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: 'シェア＆ブース追加',
                name: 'salon.show.shareAndBooth.create',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '備品',
                name: 'salon.show.equipment',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '備品詳細',
                name: 'salon.show.equipment.detail',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '備品編集',
                name: 'salon.show.equipment.edit',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },
            {
                label: '備品追加',
                name: 'salon.show.equipment.create',
                breadcrumbs: ['dashboard', 'salon.index', 'salon.show'],
            },

            // 送金管理

            {
                label: '送金管理',
                name: 'money-transfer',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '送金リクエスト',
                name: 'money-transfer.request',
                breadcrumbs: ['dashboard', 'money-transfer'],
            },
            {
                label: '口座送金履歴',
                name: 'money-transfer.history',
                breadcrumbs: ['dashboard', 'money-transfer'],
            },

            // スマートロック管理
            {
                label: 'スマートロック一覧',
                name: 'smartlock.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '新規作成',
                name: 'smartlock.create',
                breadcrumbs: ['dashboard', 'smartlock.index'],
            },

            // 会員管理

            {
                label: '会員一覧',
                name: 'beautician.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '会員情報',
                name: 'beautician.show',
                breadcrumbs: ['dashboard', 'beautician.index'],
                paramKey: 'id',
            },
            {
                label: '基本情報',
                name: 'beautician.show.basic',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '基本情報編集',
                name: 'beautician.show.basic.edit',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '顧客一覧',
                name: 'beautician.show.customer.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '顧客詳細',
                name: 'beautician.show.customer.show',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.customer.index',
                ],
                paramKey: 'customerId',
            },
            {
                label: '顧客編集',
                name: 'beautician.show.customer.edit',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.customer.index',
                ],
            },
            {
                label: '流通売上',
                name: 'beautician.show.sales.distribution.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '席予約情報',
                name: 'beautician.show.reserve.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '施術メニュー',
                name: 'beautician.show.treatment.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: 'スナップフォト',
                name: 'beautician.show.snapphoto.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '入金履歴',
                name: 'beautician.show.deposit.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: 'オプション一覧',
                name: 'beautician.show.expenditure.index',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                ],
            },
            {
                label: '定期オプション追加',
                name: 'beautician.show.expenditure.regular-name.create',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
            },
            {
                label: '定期オプション登録',
                name: 'beautician.show.expenditure.regular.create',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
            },
            {
                label: '定期オプション詳細',
                name: 'beautician.show.expenditure.regular.show',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
                paramKey: 'expenditureId',
            },
            {
                label: '定期オプション編集',
                name: 'beautician.show.expenditure.regular.edit',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
                paramKey: 'expenditureId',
            },
            {
                label: '定期オプション名追加',
                name: 'beautician.show.expenditure.regular-name.create',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
            },
            {
                label: '個別オプション登録',
                name: 'beautician.show.expenditure.individual.create',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
            },
            {
                label: '個別オプション詳細',
                name: 'beautician.show.expenditure.individual.show',
                breadcrumbs: [
                    'dashboard',
                    'beautician.index',
                    'beautician.show',
                    'beautician.show.expenditure.index',
                ],
                paramKey: 'expenditureId',
            },

            // 顧客管理

            {
                label: '顧客一覧',
                name: 'customer.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '顧客情報',
                name: 'customer.show',
                breadcrumbs: ['dashboard', 'customer.index'],
                paramKey: 'id',
            },
            {
                label: '編集',
                name: 'customer.edit',
                breadcrumbs: ['dashboard', 'customer.index', 'customer.show'],
            },

            // オペレータ管理
            {
                label: 'オペレータ一覧',
                name: 'operator.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '新規作成',
                name: 'operator.create',
                breadcrumbs: ['dashboard', 'operator.index'],
            },
            {
                label: 'オペレータ情報',
                name: 'operator.show',
                breadcrumbs: ['dashboard', 'operator.index'],
                paramKey: 'id',
            },
            {
                label: 'アカウント設定',
                name: 'me.setting',
                breadcrumbs: ['dashboard'],
            },

            // 売却査定依頼管理
            {
                label: '売却査定依頼一覧',
                name: 'sale-assessment.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '売却査定依頼情報',
                name: 'sale-assessment.show',
                breadcrumbs: ['dashboard', 'sale-assessment.index'],
                paramKey: 'id',
            },

            // その他管理
            {
                label: 'その他管理',
                name: 'other.index',
                breadcrumbs: ['dashboard'],
            },
            // オペレータ権限テンプレート
            {
                label: 'オペレータ権限テンプレート一覧',
                name: 'operator.operator-permission-template.index',
                breadcrumbs: ['dashboard', 'operator.index'],
            },
            {
                label: '新規作成',
                name: 'operator.operator-permission-template.create',
                breadcrumbs: [
                    'dashboard',
                    'operator.index',
                    'operator.operator-permission-template.index',
                ],
            },
            {
                label: 'オペレータ権限テンプレート情報',
                name: 'operator.operator-permission-template.show',
                breadcrumbs: [
                    'dashboard',
                    'operator.index',
                    'operator.operator-permission-template.index',
                ],
                paramKey: 'id',
            },
            // 説明会のご案内テンプレート
            {
                label: '説明会のご案内テンプレート一覧',
                name: 'notice.info-session-template.index',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                ],
            },
            {
                label: '新規作成',
                name: 'notice.info-session-template.create',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                    'notice.info-session-template.index',
                ],
            },
            {
                label: '説明会のご案内テンプレート情報',
                name: 'notice.info-session-template.show',
                breadcrumbs: [
                    'dashboard',
                    'notice.owner.infoSession.plain.index',
                    'notice.info-session-template.index',
                ],
                paramKey: 'id',
            },

            // お知らせテンプレート
            {
                label: 'お知らせテンプレート一覧',
                name: 'notice-template.index',
                breadcrumbs: ['dashboard', 'notice.index'],
            },
            {
                label: '新規作成',
                name: 'notice-template.create',
                breadcrumbs: [
                    'dashboard',
                    'notice.index',
                    'notice-template.index',
                ],
            },
            {
                label: 'お知らせテンプレート情報',
                name: 'notice-template.show',
                breadcrumbs: [
                    'dashboard',
                    'notice.index',
                    'notice-template.index',
                ],
                paramKey: 'id',
            },
            // お知らせグループ
            {
                label: 'お知らせグループ一覧',
                name: 'notice-group.index',
                breadcrumbs: ['dashboard', 'notice.index'],
            },
            {
                label: '新規作成',
                name: 'notice-group.create',
                breadcrumbs: [
                    'dashboard',
                    'notice.index',
                    'notice-group.index',
                ],
            },
            {
                label: 'お知らせグループ情報',
                name: 'notice-group.show',
                breadcrumbs: [
                    'dashboard',
                    'notice.index',
                    'notice-group.index',
                ],
                paramKey: 'id',
            },

            // 共通書類アップロード
            {
                label: '共通書類一覧',
                name: 'other.salon-terms-of-services',
                breadcrumbs: ['dashboard', 'other.index'],
            },

            // お問合せ返信テンプレート
            {
                label: 'お問合せ返信テンプレート一覧',
                name: 'inquiry.inquiry-reply-template.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '新規作成',
                name: 'inquiry.inquiry-reply-template.create',
                breadcrumbs: [
                    'dashboard',
                    'inquiry.inquiry-reply-template.index',
                ],
            },
            {
                label: 'お問合せ返信テンプレート情報',
                name: 'inquiry.inquiry-reply-template.show',
                breadcrumbs: [
                    'dashboard',
                    'inquiry.inquiry-reply-template.index',
                ],
                paramKey: 'id',
            },

            {
                label: 'ランク一覧',
                name: 'other.rank.index',
                breadcrumbs: ['dashboard', 'other.index'],
            },
            {
                label: 'ランク編集',
                name: 'other.rank.edit',
                breadcrumbs: ['dashboard', 'other.index'],
            },
            {
                label: 'ランク別会員一覧',
                name: 'other.rank.beautician',
                breadcrumbs: ['dashboard', 'other.index', 'other.rank.index'],
            },

            // 予約管理
            {
                label: '予約一覧',
                name: 'reservation.index',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '予約情報',
                name: 'reservation.show',
                breadcrumbs: ['dashboard', 'reservation.index'],
                paramKey: 'id',
            },
            {
                label: '予約編集',
                name: 'reservation.edit',
                breadcrumbs: ['dashboard', 'reservation.index'],
                paramKey: 'id',
            },
            {
                label: 'JAM売上',
                name: 'sales.jam',
                breadcrumbs: ['dashboard'],
            },
            {
                label: '流通売上',
                name: 'sales.distribution',
                breadcrumbs: ['dashboard'],
            },
        ]

        function buildBreadcrumbs() {
            const meta = breadcrumbMetas.find(
                (m) => m.name === context.root.$route.name
            )
            if (!meta) {
                console.log(
                    'context.root.$route.name:',
                    context.root.$route.name
                )
                throw new Error('invalid breadcrumbs.')
            }

            const breadcrumb = meta.breadcrumbs.map((route: string) => {
                const routeInfo = breadcrumbMetas.find(
                    (meta) => meta.name === route
                )
                if (!routeInfo) {
                    console.log('route:', route)
                    throw new Error('invalid routeInfo.')
                }

                const label = genLabel(routeInfo)
                return {
                    label,
                    name: routeInfo.name,
                    to: routeInfo.paramKey
                        ? {
                              name: routeInfo.name,
                              params: {
                                  [routeInfo.paramKey]:
                                      context.root.$route.params[
                                          routeInfo.paramKey
                                      ],
                              },
                          }
                        : { name: routeInfo.name },
                    disabled: false,
                }
            })

            // add current self
            breadcrumb.push({
                label: genLabel(meta),
                name: meta.name,
                to: { name: '' },
                disabled: true,
            })

            return breadcrumb
        }

        function genLabel(routeInfo: { paramKey?: string; label: string }) {
            return routeInfo.paramKey
                ? `${routeInfo.label} ID:${
                      context.root.$route.params[routeInfo.paramKey]
                  }`
                : routeInfo.label
        }

        const state = reactive({
            breadcrumbs: buildBreadcrumbs(),
        })

        watch(
            () => context.root.$route,
            () => {
                state.breadcrumbs = buildBreadcrumbs()
            }
        )

        return {
            props,
            state,
        }
    },
})
</script>

<style lang="scss">
.sk-breadcrumbs {
    font-size: 12px;
    margin-top: 15px;
    padding-left: 0 !important;

    li {
        display: inline-block;

        a {
            color: white;
            font-weight: bold;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .arrow {
        padding: 0 8px;
        color: #ccc;
    }

    .icon {
        margin-right: 5px;
    }

    .current-label {
        color: #eee;
    }
}
</style>
