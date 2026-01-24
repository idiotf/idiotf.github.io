// ========================================
// s블록 0.4.6 - 변수 생성 및 갱신 시스템 통합본
// 업데이트 내역: 변수 만들기 블록 추가 및 시스템 최적화
// ========================================


Entry.staticBlocks = [
    { category: 'start', blocks: ['when_run_button_click', 'when_some_key_pressed', 'mouse_clicked', 'mouse_click_cancled', 'when_object_click', 'when_object_click_canceled', 'when_message_cast', 'message_cast', 'message_cast_wait', 'when_scene_start', 'start_scene', 'start_neighbor_scene', 'check_object_property', 'check_block_execution', 'switch_scope', 'is_answer_submited', 'check_lecture_goal', 'check_variable_by_name', 'show_prompt', 'check_goal_success', 'positive_number', 'negative_number', 'wildcard_string', 'wildcard_boolean', 'register_score'] },
    { category: 'flow', blocks: ['wait_second', 'repeat_basic', 'repeat_inf', 'repeat_while_true', 'stop_repeat', '_if', 'if_else', 'wait_until_true', 'stop_object', 'restart_project', 'when_clone_start', 'create_clone', 'delete_clone', 'remove_all_clones'] },
    { category: 'moving', blocks: ['move_direction', 'bounce_wall', 'move_x', 'move_y', 'move_xy_time', 'locate_x', 'locate_y', 'locate_xy', 'locate_xy_time', 'locate', 'locate_object_time', 'rotate_relative', 'direction_relative', 'rotate_by_time', 'direction_relative_duration', 'rotate_absolute', 'direction_absolute', 'see_angle_object', 'move_to_angle'] },
    { category: 'looks', blocks: ['show', 'hide', 'dialog_time', 'dialog', 'remove_dialog', 'change_to_some_shape', 'change_to_next_shape', 'add_effect_amount', 'change_effect_amount', 'erase_all_effects', 'change_scale_size', 'set_scale_size', 'flip_x', 'flip_y', 'change_object_index'] },
    { category: 'brush', blocks: ['brush_stamp', 'start_drawing', 'stop_drawing', 'set_color', 'set_random_color', 'change_thickness', 'set_thickness', 'change_brush_transparency', 'set_brush_tranparency', 'brush_erase_all'] },
    { category: 'text', blocks: ['text_blue', 'text_orange', 'text_Yello', 'text_gray ', 'text_flush'] },
    { category: 'sound', blocks: ['sound_something_with_block', 'sound_something_second_with_block', 'sound_from_to', 'sound_something_wait_with_block', 'sound_something_second_wait_with_block', 'sound_from_to_and_wait', 'sound_volume_change', 'sound_volume_set', 'sound_silent_all'] },
    { category: 'judgement', blocks: ['is_clicked', 'is_press_some_key', 'reach_something', 'boolean_basic_operator', 'boolean_and_or', 'boolean_not'] },
    { category: 'calc', blocks: ['calc_basic', 'calc_rand', 'coordinate_mouse', 'coordinate_object', 'get_sound_volume', 'quotient_and_mod', 'calc_operation', 'get_project_timer_value', 'choose_project_timer_action', 'set_visible_project_timer', 'get_date', 'distance_something', 'get_sound_duration', 'get_user_name', 'length_of_string', 'combine_something', 'char_at', 'substring', 'index_of_string', 'replace_string', 'change_string_case'] },
    { category: 'variable', blocks: ['variableAddButton', 'listAddButton', 'ask_and_wait', 'get_canvas_input_value', 'set_visible_answer', 'get_variable', 'change_variable', 'set_variable', 'show_variable', 'hide_variable', 'value_of_index_from_list', 'add_value_to_list', 'remove_value_from_list', 'insert_value_to_list', 'change_value_list_index', 'length_of_list', 'is_included_in_list', 'show_list', 'hide_list'] },
    { category: 'func', blocks: ['functionAddButton'] },
    { category: 'analysis', blocks: ['analizyDataAddButton', 'append_row_to_table', 'insert_row_to_table', 'delete_row_from_table', 'set_value_from_table', 'get_table_count', 'get_value_from_table', 'calc_values_from_table', 'open_table_chart', 'close_table_chart'] },
    { category: 'ai_utilize', blocks: ['aiUtilizeBlockAddButton', 'aiUtilizeModelTrainButton', 'audio_title', 'check_microphone', 'speech_to_text_convert', 'speech_to_text_get_value', 'get_microphone_volume', 'tts_title', 'read_text', 'read_text_wait_with_block', 'set_tts_property', 'translate_title', 'get_translated_string', 'check_language', 'video_title', 'video_draw_webcam', 'video_check_webcam', 'video_flip_camera', 'video_set_camera_opacity_option', 'video_motion_value', 'video_toggle_model', 'video_is_model_loaded', 'video_number_detect', 'video_toggle_ind', 'video_body_part_coord', 'video_face_part_coord', 'video_detected_face_info'] },
    { category: 'expansion', blocks: ['expansionBlockAddButton', 'weather_title', 'check_weather', 'check_finedust', 'get_weather_data', 'get_current_weather_data', 'get_today_temperature', 'check_city_weather', 'check_city_finedust', 'get_city_weather_data', 'get_current_city_weather_data', 'get_today_city_temperature', 'festival_title', 'count_festival', 'get_festival_info', 'behaviorConductDisaster_title', 'count_disaster_behavior', 'get_disaster_behavior', 'behaviorConductLifeSafety_title', 'count_lifeSafety_behavior', 'get_lifeSafety_behavior'] },
    { category: 'arduino', blocks: ['arduino_reconnect', 'arduino_open', 'arduino_cloud_pc_open', 'arduino_connect', 'arduino_download_connector', 'download_guide', 'arduino_download_source', 'arduino_noti'].concat(EntryStatic.DynamicHardwareBlocks) }
];


EntryStatic.getAllBlocks = () => Entry.staticBlocks;


const updateCategory = (category, options) => {
    Entry.playground.mainWorkspace.blockMenu._generateCategoryView([
        { category: 'start', visible: true }, { category: 'flow', visible: true }, { category: 'moving', visible: true },
        { category: 'looks', visible: true }, { category: 'brush', visible: true }, { category: 'text', visible: true },
        { category: 'sound', visible: true }, { category: 'judgement', visible: true }, { category: 'calc', visible: true },
        { category: 'variable', visible: true }, { category: 'func', visible: true }, { category: 'analysis', visible: true },
        { category: 'ai_utilize', visible: true }, { category: 'expansion', visible: true }, { category: 'arduino', visible: false },
        { category: category, visible: true }
    ]);
    for (let i = 0; i < $('.entryCategoryElementWorkspace').length; i++) {
        if (!($($('.entryCategoryElementWorkspace')[i]).attr('id') == 'entryCategorytext')) {
            $($('.entryCategoryElementWorkspace')[i]).attr('class', 'entryCategoryElementWorkspace');
        }
    }
    Entry.playground.blockMenu._categoryData = EntryStatic.getAllBlocks();
    Entry.playground.blockMenu._generateCategoryCode(category);
    if (options) {
        if (options.background) {
            $(`#entryCategory${category}`).css({ 'background-image': `url(${options.background})`, 'background-repeat': 'no-repeat' });
            if (options.backgroundSize) $(`#entryCategory${category}`).css('background-size', options.backgroundSize + 'px');
        }
        if (options.name) $(`#entryCategory${category}`)[0].innerText = options.name;
    }
};


const addBlock = (blockname, template, color, params, _class, func, skeleton = 'basic') => {
    Entry.block[blockname] = {
        color: color.color, outerLine: color.outerline, fontColor: color.fontColor,
        skeleton: skeleton, statement: [], params: params.params, events: {},
        def: { params: params.def, type: blockname },
        paramsKeyMap: params.map, class: _class || 'default', func: func, template: template
    };
};


// --- s블록 정의 시작 ---


addBlock('s블록_주석', '#주석 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, 
{ params: [{ type: 'Indicator', img: 'block_icon/start_icon_play.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => {
    return script.callReturn();
}, 'basic_event');


// [신규] 변수 만들기 블록
addBlock('s블록_변수만들기', '이름이 %1 이고 기본값이 %2 인 변수 만들기 %3', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, 
{ 
    params: [
        { type: 'Block', accept: 'string' },
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }
    ], 
    def: [{ type: 'text', params: ['새 변수'] }, { type: 'text', params: ['0'] }, null], 
    map: { NAME: 0, VALUE: 1 } 
}, 's블록', (sprite, script) => {
    const name = script.getValue('NAME', script);
    const value = script.getValue('VALUE', script);
    
    // 이미 존재하는지 확인
    const exists = Entry.variableContainer.variables_.some(v => v.getName() === name);
    if (!exists) {
        Entry.variableContainer.addVariable({ name: name, value: value });
        if (Entry.playground && Entry.playground.variableView) {
            Entry.playground.variableView.updateView();
        }
    }
    return script.callReturn();
});


addBlock('s블록_붕어빵', '%1 붕어빵 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, 
{ 
    params: [
        { type: 'Dropdown', options: [['팥', '팥'], ['슈크림', '슈크림']], value: '팥', fontSize: 11 },
        { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }
    ], 
    def: ['팥', null], 
    map: { TYPE: 0 } 
}, 's블록', (sprite, script) => {
    return script.callReturn();
});


addBlock('s블록_붕어빵판매', '%1 붕어빵을 %2 원에 팔기 %3', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, 
{ 
    params: [
        { type: 'Dropdown', options: [['팥', '팥'], ['슈크림', '슈크림']], value: '팥', fontSize: 11 },
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }
    ], 
    def: ['팥', { type: 'number', params: ['1000'] }, null], 
    map: { TYPE: 0, PRICE: 1 } 
}, 's블록', (sprite, script) => {
    const type = script.getField('TYPE', script);
    const price = Number(script.getValue('PRICE', script));
    
    let allVars = Entry.variableContainer.variables_;
    let currentVar = null;
    let currentName = "붕어빵 수익";


    for (let i = 0; i < allVars.length; i++) {
        if (allVars[i].getName().startsWith("붕어빵 수익")) {
            if (!currentVar || allVars[i].getName().length >= currentVar.getName().length) {
                currentVar = allVars[i];
            }
        }
    }


    let lastValue = 0;
    if (currentVar) {
        lastValue = Number(currentVar.getValue());
        currentName = currentVar.getName();
        Entry.variableContainer.removeVariable(currentVar);
    }


    const newName = currentName + " ";
    const newValue = lastValue + price;


    Entry.variableContainer.addVariable({ name: newName, value: newValue });


    if (Entry.playground && Entry.playground.variableView) {
        Entry.playground.variableView.updateView();
    }
    
    alert(`[${type} 붕어빵 판매 완료]\n"${newName}"\n합계: ${newValue}원`);
    return script.callReturn();
});


// --- 이하 기타 유틸리티 블록 ---
addBlock('s블록_엔트리페이지열기', '엔트리 %1 열기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, 
{ params: [{ type: 'Dropdown', options: [['엔트리이야기', 'story'], ['노하우&팁', 'tips'], ['묻고답하기', 'qna'], ['작품만들기', 'create'], ['메인', 'main']], value: 'story', fontSize: 11 }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: ['story', null], map: { PAGE: 0 } }, 's블록', (sprite, script) => {
    const urls = { story: 'https://playentry.org/community/entrystory/list', tips: 'https://playentry.org/community/tips/list', qna: 'https://playentry.org/community/qna/list', create: 'https://playentry.org/project/create', main: 'https://playentry.org/' };
    window.open(urls[script.getField('PAGE', script)], '_blank'); return script.callReturn();
});


addBlock('s블록_작품일시정지', '작품 일시정지하기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { Entry.engine.togglePause(); return script.callReturn(); });
addBlock('s블록_작품멈추기', '작품 멈추기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { Entry.engine.toggleStop(); return script.callReturn(); });
addBlock('s블록_엔트리검색', '엔트리에 %1 검색하기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['검색어'] }, null], map: { QUERY: 0 } }, 's블록', (sprite, script) => { window.open(`https://playentry.org/us?query=${encodeURIComponent(script.getValue('QUERY', script))}`, '_blank'); return script.callReturn(); });
addBlock('s블록_사이트열기', '%1 사이트 열기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['https://playentry.org'] }, null], map: { URL: 0 } }, 's블록', (sprite, script) => { let url = script.getValue('URL', script); if (!url.startsWith('http')) url = 'https://' + url; window.open(url, '_blank'); return script.callReturn(); });
addBlock('s블록_페이지이름바꾸기', '페이지 이름을 %1 으로 바꾸기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['새 페이지 이름'] }, null], map: { NAME: 0 } }, 's블록', (sprite, script) => { document.title = script.getValue('NAME', script); return script.callReturn(); });
addBlock('s블록_콘솔입력', '콘솔에 %1 로그하기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['메시지'] }, null], map: { MSG: 0 } }, 's블록', (sprite, script) => { console.log(script.getValue('MSG', script)); return script.callReturn(); });
addBlock('s블록_페이지새로고침', '이 페이지 새로고침하기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { location.reload(); return script.callReturn(); });
addBlock('s블록_제작자페이지열기', '이 블록 제작자의 마이페이지 열기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { window.open('https://playentry.org/profile/68edf09ff4425b0e0595f07e?sort=created&term=all&isOpen=all', '_blank'); return script.callReturn(); });
addBlock('s블록_경고창', '%1 경고창 띄우기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['안녕하세요!'] }, null], map: { CONTENT: 0 } }, 's블록', (sprite, script) => { alert(script.getValue('CONTENT', script)); return script.callReturn(); });
addBlock('s블록_복사하기', '%1 복사하기 %2', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'string' }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [{ type: 'text', params: ['복사할 내용'] }, null], map: { DATA: 0 } }, 's블록', (sprite, script) => { const t = document.createElement('textarea'); t.value = script.getValue('DATA', script); document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); return script.callReturn(); });
addBlock('s블록_모든블록해제', '더미데이터 불러오기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { if (Entry.playground?.blockMenu?._bannedClass) { [...Entry.playground.blockMenu._bannedClass].forEach(c => Entry.playground.blockMenu.unbanClass(c)); Entry.playground.blockMenu._generateCategoryView(); alert("더미데이터가 활성화 되었습니다!"); } return script.callReturn(); });
addBlock('s블록_탐험하기열기', '탐험하기 열기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { window.open('https://space.playentry.org/explore', '_blank'); return script.callReturn(); });
addBlock('s블록_인작보러가기', '인작 보러가기 %1', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null], map: {} }, 's블록', (sprite, script) => { window.open('https://playentry.org/project/list/popular?sort=ranked&term=all', '_blank'); return script.callReturn(); });


addBlock('s블록_조건부기다리기', '만일 %1 이라면 %2 가 %3 기다리기 %4', { color: '#0a0e83ff', outerline: '#10306aff', fontColor: '#ffffff' }, { params: [{ type: 'Block', accept: 'boolean' }, { type: 'Block', accept: 'boolean' }, { type: 'Dropdown', options: [['될 때까지', 'until'], ['인 동안', 'while']], value: 'until', fontSize: 11 }, { type: 'Indicator', img: 'block_icon/hardware_icon.svg', size: 11 }], def: [null, null, 'until', null], map: { IF_COND: 0, WAIT_COND: 1, TYPE: 2 } }, 's블록', (sprite, script) => { if (!script.getValue('IF_COND', script)) return script.callReturn(); const waitCond = script.getValue('WAIT_COND', script); const type = script.getField('TYPE', script); if (type === 'until' && waitCond) return script.callReturn(); if (type === 'while' && !waitCond) return script.callReturn(); return script; });


Entry.staticBlocks.push({
    category: 's블록',
    visible: true,
    blocks: [
        's블록_주석',
        's블록_변수만들기', // 추가됨
        's블록_붕어빵',
        's블록_붕어빵판매',
        's블록_모든블록해제',
        's블록_복사하기',
        's블록_경고창',
        's블록_탐험하기열기',
        's블록_인작보러가기',
        's블록_엔트리페이지열기',
        's블록_조건부기다리기',
        's블록_사이트열기',
        's블록_작품일시정지',
        's블록_작품멈추기',
        's블록_엔트리검색',
        's블록_페이지이름바꾸기',
        's블록_콘솔입력',
        's블록_페이지새로고침',
        's블록_제작자페이지열기'
    ]
});


updateCategory('s블록');


$('head').append(`
<style>
#entryCategorys블록 { background-image: url(/lib/entry-js/images/hardware.svg); background-repeat: no-repeat; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; margin-bottom: 1px; }
.entrySelectedCategory#entryCategorys블록 { background-image: url(/lib/entry-js/images/hardware_on.svg); background-color: #0a0e83ff; border-color: #10306aff; color: #ffffffff; }
</style>
`);


if ($('#entryCategorys블록').length) {
    $('#entryCategorys블록').text('s블록');
}


alert('s블록 0.4.6 업데이트 완료 (변수 만들기 블록 추가)');
